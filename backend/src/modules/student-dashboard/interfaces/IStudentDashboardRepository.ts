import { ClientSession } from 'mongodb';
import { 
  StudentDashboardData, 
  PollStatistics, 
  PollResult, 
  ActivePoll, 
  UpcomingPoll 
} from './IStudentDashboardService.js';

export interface IStudentDashboardRepository {
  // Student Profile Operations
  getStudentProfile(studentId: string, session?: ClientSession): Promise<any>;
  updateStudentProfile(studentId: string, data: any, session?: ClientSession): Promise<any>;
  
  // Poll Statistics Operations
  getPollStatistics(studentId: string, session?: ClientSession): Promise<PollStatistics>;
  
  // Poll Results Operations
  getPollResults(studentId: string, limit?: number, session?: ClientSession): Promise<PollResult[]>;
  getPollResultById(studentId: string, pollId: string, session?: ClientSession): Promise<PollResult | null>;
  
  // Active Polls Operations
  getActivePolls(studentId: string, session?: ClientSession): Promise<ActivePoll[]>;
  
  // Upcoming Polls Operations
  getUpcomingPolls(studentId: string, limit?: number, session?: ClientSession): Promise<UpcomingPoll[]>;
  
  // Student Poll Operations
  createStudentPoll(data: any, session?: ClientSession): Promise<string>;
  updateStudentPoll(studentId: string, pollId: string, data: any, session?: ClientSession): Promise<any>;
  getStudentPoll(studentId: string, pollId: string, session?: ClientSession): Promise<any>;
  
  // Dashboard Data Operations
  getDashboardData(studentId: string, session?: ClientSession): Promise<StudentDashboardData>;
  
  // Analytics Operations
  getStudentAnalytics(studentId: string, timeRange?: string, session?: ClientSession): Promise<any>;
  getSubjectPerformance(studentId: string, subject: string, session?: ClientSession): Promise<any>;
} 