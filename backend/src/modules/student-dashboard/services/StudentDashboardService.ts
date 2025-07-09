import { BaseService } from '#root/shared/classes/BaseService.js';
import { MongoDatabase } from '#root/shared/database/providers/mongo/MongoDatabase.js';
import { GLOBAL_TYPES } from '#root/types.js';
import { STUDENT_DASHBOARD_TYPES } from '../types.js';
import { injectable, inject } from 'inversify';
import { IStudentDashboardService, StudentDashboardData, PollStatistics, PollResult, ActivePoll, UpcomingPoll } from '../interfaces/IStudentDashboardService.js';
import { IStudentDashboardRepository } from '../interfaces/IStudentDashboardRepository.js';

@injectable()
export class StudentDashboardService extends BaseService implements IStudentDashboardService {
  constructor(
    @inject(GLOBAL_TYPES.Database)
    private readonly database: MongoDatabase,
    @inject(STUDENT_DASHBOARD_TYPES.StudentDashboardRepository)
    private readonly studentDashboardRepository: IStudentDashboardRepository,
  ) {
    super(database);
  }

  async getStudentDashboardData(studentId: string): Promise<StudentDashboardData> {
    return await this.studentDashboardRepository.getDashboardData(studentId);
  }

  async getPollStatistics(studentId: string): Promise<PollStatistics> {
    return await this.studentDashboardRepository.getPollStatistics(studentId);
  }

  async getPollResults(studentId: string): Promise<PollResult[]> {
    return await this.studentDashboardRepository.getPollResults(studentId);
  }

  async getActivePolls(studentId: string): Promise<ActivePoll[]> {
    return await this.studentDashboardRepository.getActivePolls(studentId);
  }

  async getUpcomingPolls(studentId: string): Promise<UpcomingPoll[]> {
    return await this.studentDashboardRepository.getUpcomingPolls(studentId);
  }

  // Additional methods for enhanced functionality
  async getStudentAnalytics(studentId: string, timeRange: string = '30d'): Promise<any> {
    return await this.studentDashboardRepository.getStudentAnalytics(studentId, timeRange);
  }

  async getSubjectPerformance(studentId: string, subject: string): Promise<any> {
    return await this.studentDashboardRepository.getSubjectPerformance(studentId, subject);
  }

  async updateStudentProfile(studentId: string, data: any): Promise<any> {
    return await this.studentDashboardRepository.updateStudentProfile(studentId, data);
  }
} 