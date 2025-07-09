export interface IStudentDashboardService {
  getStudentDashboardData(studentId: string): Promise<StudentDashboardData>;
  getPollStatistics(studentId: string): Promise<PollStatistics>;
  getPollResults(studentId: string): Promise<PollResult[]>;
  getActivePolls(studentId: string): Promise<ActivePoll[]>;
  getUpcomingPolls(studentId: string): Promise<UpcomingPoll[]>;
}

export interface StudentDashboardData {
  studentName: string;
  pollStatistics: PollStatistics;
  pollResults: PollResult[];
  activePolls: ActivePoll[];
  upcomingPolls: UpcomingPoll[];
}

export interface PollStatistics {
  total: number;
  taken: number;
  absent: number;
}

export interface PollResult {
  id: string;
  name: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  percentage: number;
}

export interface ActivePoll {
  id: string;
  title: string;
  type: string;
  timer: string;
  status: 'ongoing' | 'starting';
}

export interface UpcomingPoll {
  id: string;
  title: string;
  scheduledTime: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
} 