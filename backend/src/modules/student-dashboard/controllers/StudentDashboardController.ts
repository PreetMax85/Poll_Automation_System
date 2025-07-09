import { StudentDashboardService } from '../services/StudentDashboardService.js';
import { STUDENT_DASHBOARD_TYPES } from '../types.js';
import { injectable, inject } from 'inversify';
import {
  JsonController,
  Get,
  Put,
  HttpCode,
  Param,
  Params,
  Body,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { 
  GetStudentDashboardParams, 
  StudentDashboardResponse,
  PollStatisticsResponse,
  PollResultResponse,
  ActivePollResponse,
  UpcomingPollResponse
} from '../classes/validators/StudentDashboardValidators.js';

@OpenAPI({
  tags: ['Student Dashboard'],
})
@JsonController('/student-dashboard', { transformResponse: true })
@injectable()
export class StudentDashboardController {
  constructor(
    @inject(STUDENT_DASHBOARD_TYPES.StudentDashboardService)
    private readonly studentDashboardService: StudentDashboardService,
  ) {}

  @OpenAPI({
    summary: 'Get student dashboard data',
    description: 'Retrieves comprehensive dashboard data for a student including statistics, results, and polls.',
  })
  @Get('/:studentId')
  @HttpCode(200)
  @ResponseSchema(StudentDashboardResponse, {
    description: 'Student dashboard data retrieved successfully',
  })
  async getStudentDashboard(
    @Params() params: GetStudentDashboardParams,
  ): Promise<StudentDashboardResponse> {
    const { studentId } = params;
    return await this.studentDashboardService.getStudentDashboardData(studentId);
  }

  @OpenAPI({
    summary: 'Get student poll statistics',
    description: 'Retrieves poll statistics for a student (total, taken, absent).',
  })
  @Get('/:studentId/statistics')
  @HttpCode(200)
  @ResponseSchema(PollStatisticsResponse, {
    description: 'Poll statistics retrieved successfully',
  })
  async getPollStatistics(
    @Params() params: GetStudentDashboardParams,
  ): Promise<PollStatisticsResponse> {
    const { studentId } = params;
    return await this.studentDashboardService.getPollStatistics(studentId);
  }

  @OpenAPI({
    summary: 'Get student poll results',
    description: 'Retrieves poll results for a student.',
  })
  @Get('/:studentId/results')
  @HttpCode(200)
  @ResponseSchema(PollResultResponse, {
    description: 'Poll results retrieved successfully',
    isArray: true,
  })
  async getPollResults(
    @Params() params: GetStudentDashboardParams,
  ): Promise<PollResultResponse[]> {
    const { studentId } = params;
    return await this.studentDashboardService.getPollResults(studentId);
  }

  @OpenAPI({
    summary: 'Get active polls for student',
    description: 'Retrieves currently active polls for a student.',
  })
  @Get('/:studentId/active-polls')
  @HttpCode(200)
  @ResponseSchema(ActivePollResponse, {
    description: 'Active polls retrieved successfully',
    isArray: true,
  })
  async getActivePolls(
    @Params() params: GetStudentDashboardParams,
  ): Promise<ActivePollResponse[]> {
    const { studentId } = params;
    return await this.studentDashboardService.getActivePolls(studentId);
  }

  @OpenAPI({
    summary: 'Get upcoming polls for student',
    description: 'Retrieves upcoming polls for a student.',
  })
  @Get('/:studentId/upcoming-polls')
  @HttpCode(200)
  @ResponseSchema(UpcomingPollResponse, {
    description: 'Upcoming polls retrieved successfully',
    isArray: true,
  })
  async getUpcomingPolls(
    @Params() params: GetStudentDashboardParams,
  ): Promise<UpcomingPollResponse[]> {
    const { studentId } = params;
    return await this.studentDashboardService.getUpcomingPolls(studentId);
  }

  @OpenAPI({
    summary: 'Get student analytics',
    description: 'Retrieves analytics data for a student including performance trends and subject analysis.',
  })
  @Get('/:studentId/analytics')
  @HttpCode(200)
  async getStudentAnalytics(
    @Params() params: GetStudentDashboardParams,
    @Param('timeRange') timeRange: string = '30d',
  ): Promise<any> {
    const { studentId } = params;
    return await this.studentDashboardService.getStudentAnalytics(studentId, timeRange);
  }

  @OpenAPI({
    summary: 'Get subject performance',
    description: 'Retrieves performance data for a specific subject.',
  })
  @Get('/:studentId/subjects/:subject/performance')
  @HttpCode(200)
  async getSubjectPerformance(
    @Params() params: GetStudentDashboardParams,
    @Param('subject') subject: string,
  ): Promise<any> {
    const { studentId } = params;
    return await this.studentDashboardService.getSubjectPerformance(studentId, subject);
  }

  @OpenAPI({
    summary: 'Update student profile',
    description: 'Updates student profile information and preferences.',
  })
  @Put('/:studentId/profile')
  @HttpCode(200)
  async updateStudentProfile(
    @Params() params: GetStudentDashboardParams,
    @Body() profileData: any,
  ): Promise<any> {
    const { studentId } = params;
    return await this.studentDashboardService.updateStudentProfile(studentId, profileData);
  }
} 