import { IStudentDashboardRepository } from '../interfaces/IStudentDashboardRepository.js';
import { 
  StudentDashboardData, 
  PollStatistics, 
  PollResult, 
  ActivePoll, 
  UpcomingPoll 
} from '../interfaces/IStudentDashboardService.js';
import { MongoDatabase } from '#root/shared/database/providers/mongo/MongoDatabase.js';
import { GLOBAL_TYPES } from '#root/types.js';
import { injectable, inject } from 'inversify';
import { Collection, ClientSession, ObjectId } from 'mongodb';
import { StudentPoll, StudentProfile } from '../DBSchemas/index.js';

@injectable()
export class StudentDashboardRepository implements IStudentDashboardRepository {
  private studentPollsCollection!: Collection;
  private studentProfilesCollection!: Collection;

  constructor(
    @inject(GLOBAL_TYPES.Database)
    private readonly database: MongoDatabase,
  ) {}

  private async init(): Promise<void> {
    if (!this.studentPollsCollection) {
      this.studentPollsCollection = await this.database.getCollection('studentPolls');
    }
    if (!this.studentProfilesCollection) {
      this.studentProfilesCollection = await this.database.getCollection('studentProfiles');
    }
  }

  async getStudentProfile(studentId: string, session?: ClientSession): Promise<any> {
    await this.init();
    const profile = await this.studentProfilesCollection.findOne(
      { studentId },
      { session }
    );
    return profile;
  }

  async updateStudentProfile(studentId: string, data: any, session?: ClientSession): Promise<any> {
    await this.init();
    const result = await this.studentProfilesCollection.findOneAndUpdate(
      { studentId },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after', session }
    );
    return result;
  }

  async getPollStatistics(studentId: string, session?: ClientSession): Promise<PollStatistics> {
    await this.init();
    
    const pipeline = [
      { $match: { studentId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          taken: { 
            $sum: { 
              $cond: [{ $in: ['$status', ['completed', 'in_progress']] }, 1, 0] 
            } 
          },
          absent: { 
            $sum: { 
              $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] 
            } 
          }
        }
      }
    ];

    const result = await this.studentPollsCollection.aggregate(pipeline, { session }).toArray();
    
    if (result.length === 0) {
      return { total: 0, taken: 0, absent: 0 };
    }

    return {
      total: result[0].total,
      taken: result[0].taken,
      absent: result[0].absent
    };
  }

  async getPollResults(studentId: string, limit: number = 10, session?: ClientSession): Promise<PollResult[]> {
    await this.init();
    
    const results = await this.studentPollsCollection
      .find(
        { 
          studentId, 
          status: 'completed' 
        },
        { session }
      )
      .sort({ completedAt: -1 })
      .limit(limit)
      .toArray();

    return results.map(poll => ({
      id: poll.pollId,
      name: poll.pollTitle,
      subject: poll.subject,
      score: poll.score,
      maxScore: poll.maxScore,
      date: poll.completedAt.toLocaleDateString(),
      percentage: poll.percentage
    }));
  }

  async getPollResultById(studentId: string, pollId: string, session?: ClientSession): Promise<PollResult | null> {
    await this.init();
    
    const poll = await this.studentPollsCollection.findOne(
      { studentId, pollId, status: 'completed' },
      { session }
    );

    if (!poll) return null;

    return {
      id: poll.pollId,
      name: poll.pollTitle,
      subject: poll.subject,
      score: poll.score,
      maxScore: poll.maxScore,
      date: poll.completedAt.toLocaleDateString(),
      percentage: poll.percentage
    };
  }

  async getActivePolls(studentId: string, session?: ClientSession): Promise<ActivePoll[]> {
    await this.init();
    
    const activePolls = await this.studentPollsCollection
      .find(
        { 
          studentId, 
          status: { $in: ['in_progress'] } 
        },
        { session }
      )
      .toArray();

    return activePolls.map(poll => ({
      id: poll.pollId,
      title: poll.pollTitle,
      type: poll.pollType,
      timer: this.calculateRemainingTime(poll.startedAt),
      status: poll.status === 'in_progress' ? 'ongoing' : 'starting'
    }));
  }

  async getUpcomingPolls(studentId: string, limit: number = 10, session?: ClientSession): Promise<UpcomingPoll[]> {
    await this.init();
    
    const upcomingPolls = await this.studentPollsCollection
      .find(
        { 
          studentId, 
          status: 'scheduled',
          scheduledFor: { $gt: new Date() }
        },
        { session }
      )
      .sort({ scheduledFor: 1 })
      .limit(limit)
      .toArray();

    return upcomingPolls.map(poll => ({
      id: poll.pollId,
      title: poll.pollTitle,
      scheduledTime: poll.scheduledFor.toLocaleString(),
      type: poll.pollType,
      priority: this.calculatePriority(poll.scheduledFor)
    }));
  }

  async createStudentPoll(data: any, session?: ClientSession): Promise<string> {
    await this.init();
    
    const result = await this.studentPollsCollection.insertOne(data, { session });
    return result.insertedId.toString();
  }

  async updateStudentPoll(studentId: string, pollId: string, data: any, session?: ClientSession): Promise<any> {
    await this.init();
    
    const result = await this.studentPollsCollection.findOneAndUpdate(
      { studentId, pollId },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after', session }
    );
    return result;
  }

  async getStudentPoll(studentId: string, pollId: string, session?: ClientSession): Promise<any> {
    await this.init();
    
    return await this.studentPollsCollection.findOne(
      { studentId, pollId },
      { session }
    );
  }

  async getDashboardData(studentId: string, session?: ClientSession): Promise<StudentDashboardData> {
    const [profile, statistics, pollResults, activePolls, upcomingPolls] = await Promise.all([
      this.getStudentProfile(studentId, session),
      this.getPollStatistics(studentId, session),
      this.getPollResults(studentId, 5, session),
      this.getActivePolls(studentId, session),
      this.getUpcomingPolls(studentId, 5, session)
    ]);

    return {
      studentName: profile ? `${profile.firstName} ${profile.lastName}` : 'Student',
      pollStatistics: statistics,
      pollResults,
      activePolls,
      upcomingPolls
    };
  }

  async getStudentAnalytics(studentId: string, timeRange: string = '30d', session?: ClientSession): Promise<any> {
    await this.init();
    
    const dateFilter = this.getDateFilter(timeRange);
    
    const pipeline = [
      { $match: { studentId, ...dateFilter } },
      {
        $group: {
          _id: '$subject',
          totalPolls: { $sum: 1 },
          averageScore: { $avg: '$percentage' },
          bestScore: { $max: '$percentage' },
          totalScore: { $sum: '$score' },
          totalMaxScore: { $sum: '$maxScore' }
        }
      },
      { $sort: { averageScore: -1 } }
    ];

    return await this.studentPollsCollection.aggregate(pipeline, { session }).toArray();
  }

  async getSubjectPerformance(studentId: string, subject: string, session?: ClientSession): Promise<any> {
    await this.init();
    
    const pipeline = [
      { $match: { studentId, subject, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalPolls: { $sum: 1 },
          averageScore: { $avg: '$percentage' },
          bestScore: { $max: '$percentage' },
          worstScore: { $min: '$percentage' },
          improvement: {
            $avg: {
              $subtract: [
                '$percentage',
                { $arrayElemAt: ['$percentage', -1] }
              ]
            }
          }
        }
      }
    ];

    const result = await this.studentPollsCollection.aggregate(pipeline, { session }).toArray();
    return result[0] || null;
  }

  private calculateRemainingTime(startedAt: Date): string {
    if (!startedAt) return '00:00';
    
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
    const remaining = Math.max(0, 1800 - elapsed); // Assuming 30 minutes max
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private calculatePriority(scheduledFor: Date): 'high' | 'medium' | 'low' {
    const now = new Date();
    const diffHours = (scheduledFor.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours <= 1) return 'high';
    if (diffHours <= 24) return 'medium';
    return 'low';
  }

  private getDateFilter(timeRange: string): any {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return { createdAt: { $gte: startDate } };
  }
} 