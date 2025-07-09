import { authContainerModule } from '#auth/container.js';
import { sharedContainerModule } from '#root/container.js';
import { InversifyAdapter } from '#root/inversify-adapter.js';
import { Container, ContainerModule } from 'inversify';
import { RoutingControllersOptions, useContainer } from 'routing-controllers';
import { studentDashboardContainerModule } from './container.js';
import { StudentDashboardController } from './controllers/StudentDashboardController.js';
import { STUDENT_DASHBOARD_VALIDATORS } from './classes/validators/index.js';

export const studentDashboardContainerModules: ContainerModule[] = [
  studentDashboardContainerModule,
  sharedContainerModule,
  authContainerModule,
];

export const studentDashboardModuleControllers: Function[] = [
  StudentDashboardController,
];

export async function setupStudentDashboardContainer(): Promise<void> {
  const container = new Container();
  await container.load(...studentDashboardContainerModules);
  const inversifyAdapter = new InversifyAdapter(container);
  useContainer(inversifyAdapter);
}

export const studentDashboardModuleOptions: RoutingControllersOptions = {
  controllers: studentDashboardModuleControllers,
  middlewares: [],
  defaultErrorHandler: true,
  authorizationChecker: async function () {
    return true;
  },
  validation: true,
};

export const studentDashboardModuleValidators: Function[] = [
  ...STUDENT_DASHBOARD_VALIDATORS
]; 