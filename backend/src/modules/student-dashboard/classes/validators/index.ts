import {
  GetStudentDashboardParams,
  StudentDashboardResponse,
  PollStatisticsResponse,
  PollResultResponse,
  ActivePollResponse,
  UpcomingPollResponse,
} from './StudentDashboardValidators.js';

export const STUDENT_DASHBOARD_VALIDATORS = [
  GetStudentDashboardParams,
  StudentDashboardResponse,
  PollStatisticsResponse,
  PollResultResponse,
  ActivePollResponse,
  UpcomingPollResponse,
];

export * from './StudentDashboardValidators.js'; 