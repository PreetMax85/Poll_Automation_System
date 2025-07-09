import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { IsOptional } from 'class-validator';

// Request validators
export class GetStudentDashboardParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  studentId!: string;
}

// Response validators
export class PollStatisticsResponse {
  total!: number;

  taken!: number;

  absent!: number;
}

export class PollResultResponse {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  subject!: string;

  score!: number;

  maxScore!: number;

  @IsString()
  date!: string;

  percentage!: number;
}

export class ActivePollResponse {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  type!: string;

  @IsString()
  timer!: string;

  @IsString()
  status!: 'ongoing' | 'starting';
}

export class UpcomingPollResponse {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  scheduledTime!: string;

  @IsString()
  type!: string;

  @IsString()
  priority!: 'high' | 'medium' | 'low';
}

export class StudentDashboardResponse {
  @IsString()
  studentName!: string;

  @IsOptional()
  pollStatistics!: PollStatisticsResponse;

  @IsOptional()
  pollResults!: PollResultResponse[];

  @IsOptional()
  activePolls!: ActivePollResponse[];

  @IsOptional()
  upcomingPolls!: UpcomingPollResponse[];
} 