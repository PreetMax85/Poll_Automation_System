import { ContainerModule } from 'inversify';
import { STUDENT_DASHBOARD_TYPES } from './types.js';
import { StudentDashboardController } from './controllers/StudentDashboardController.js';
import { StudentDashboardService } from './services/StudentDashboardService.js';
import { StudentDashboardRepository } from './repositories/StudentDashboardRepository.js';

export const studentDashboardContainerModule = new ContainerModule(options => {
  // Repositories
  options
    .bind(STUDENT_DASHBOARD_TYPES.StudentDashboardRepository)
    .to(StudentDashboardRepository)
    .inSingletonScope();

  // Services
  options
    .bind(STUDENT_DASHBOARD_TYPES.StudentDashboardService)
    .to(StudentDashboardService)
    .inSingletonScope();

  // Controllers
  options.bind(StudentDashboardController).toSelf().inSingletonScope();
}); 