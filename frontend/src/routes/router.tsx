import {
  Router,
  Route,
  RootRoute,
  redirect,
  createMemoryHistory,
  Outlet,
  NotFoundRoute,
  useNavigate
} from '@tanstack/react-router'
import { useAuthStore } from '@/lib/store/auth-store'
import { useEffect } from 'react'

// Import pages and layouts
import AuthPage from '@/pages/auth-page'
import TeacherLayout from '@/layouts/teacher-layout'
import StudentLayout from '@/layouts/student-layout'
import { NotFoundComponent } from '@/components/not-found'
import GenAIHomePage from '@/pages/teacher/genai-home'
import TeacherPollRoom from '@/pages/teacher/TeacherPollRoom'
import CreatePollRoom from '@/pages/teacher/CreatePollRoom'
import JoinPollRoom from '@/pages/student/JoinPollRoom'
import StudentPollRoom from '@/pages/student/StudentPollRoom'
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import StudentDashboard from '@/pages/student/StudentDashboard'
import StudentProfile from '@/pages/student/StudentProfile'
import TeacherProfile from '@/pages/teacher/TeacherProfile'
import TeacherSettings from '@/pages/teacher/TeacherSettings'
import StudentSettings from '@/pages/student/StudentSettings'
import ManageRoom from '@/pages/teacher/TeacherManageRooms'
import TeacherPollAnalysis from '@/pages/teacher/TeacherPollAnalysis'

// Root route with error and notFound handling
const rootRoute = new RootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
  errorComponent: ({ error }) => {
    console.error('Router error:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h1>
          <p className="text-red-600 mb-6">{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.href = '/auth'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
});

// Auth route - accessible only when NOT authenticated
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    // Redirect to appropriate dashboard if already authenticated
    if (isAuthenticated && user?.role) {
      if (user.role === 'teacher') {
        throw redirect({ to: '/teacher' });
      } else if (user.role === 'student') {
        throw redirect({ to: '/student' });
      }
    }
  },
});

// Index route with redirect
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    // Redirect to appropriate dashboard or auth
    const { isAuthenticated, user } = useAuthStore.getState();
    if (isAuthenticated && user?.role) {
      if (user.role === 'teacher') {
        throw redirect({ to: '/teacher' });
      } else if (user.role === 'student') {
        throw redirect({ to: '/student' });
      }
    }
    // Default redirect to auth if not authenticated or role unknown
    throw redirect({ to: '/auth' });
  },
  component: () => null,
});

// Teacher layout route with auth check and role verification
const teacherLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/teacher',
  notFoundComponent: NotFoundComponent,
  beforeLoad: () => {
    // Auth and role check
    const { isAuthenticated, user } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/auth' });
    }

    // Role check - must be a teacher
    if (user?.role !== 'teacher') {
      if (user?.role === 'student') {
        throw redirect({ to: '/student' }); // Redirect students to their dashboard
      } else {
        throw redirect({ to: '/auth' }); // Redirect others to auth
      }
    }
  },
  component: TeacherLayout,
});

// Student layout route with auth check and role verification
const studentLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/student',
  notFoundComponent: NotFoundComponent,
  beforeLoad: () => {
    // Auth and role check
    const { isAuthenticated, user } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/auth' });
    }

    // Role check - must be a student
    if (user?.role !== 'student') {
      if (user?.role === 'teacher') {
        throw redirect({ to: '/teacher' }); // Redirect teachers to their dashboard
      } else {
        throw redirect({ to: '/auth' }); // Redirect others to auth
      }
    }
  },
  component: StudentLayout,
});

// Teacher dashboard route
const teacherDashboardRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/home',
  component: TeacherDashboard,
});

// Teacher profile route
const teacherProfileRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/profile',
  component: TeacherProfile,
});

// Teacher genAI home route
const teacherGenAIHomeRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/genai',
  component: GenAIHomePage,
});

// Teacher manage rooms route
const teacherManageRoomsRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/manage-rooms',
  component: ManageRoom,
}); 

// Teacher poll analysis route
const teacherPollAnalysisRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/manage-rooms/pollanalysis/$roomId',
  component: TeacherPollAnalysis,
});

// Teacher poll room route
const teacherPollRoomRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/pollroom/$code',
  component: TeacherPollRoom,
});

// Teacher Create live Poll Room route
const teacherCreateRoomRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/pollroom',
  component: CreatePollRoom,
});

// Teacher settings route
const teacherSettingsRoute = new Route({
  getParentRoute: () => teacherLayoutRoute,
  path: '/settings',
  component: TeacherSettings,
});

// Student dashboard route
const studentDashboardRoute = new Route({
  getParentRoute: () => studentLayoutRoute,
  path: '/home',
  component: StudentDashboard,
});

// Student profile route
const studentProfileRoute = new Route({
  getParentRoute: () => studentLayoutRoute,
  path: '/profile',
  component: StudentProfile,
});

// Student poll room route
const studentPollRoomRoute = new Route({
  getParentRoute: () => studentLayoutRoute,
  path: '/pollroom/$code',
  component: StudentPollRoom,
});

// Student join room route
const studentJoinRoomRoute = new Route({
  getParentRoute: () => studentLayoutRoute,
  path: '/pollroom',
  component: JoinPollRoom,
});

// Student settings route
const studentSettingsRoute = new Route({
  getParentRoute: () => studentLayoutRoute,
  path: '/settings',
  component: StudentSettings,
});

// Create a catch-all not found route
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundComponent,
});

// Create the router with the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  teacherLayoutRoute.addChildren([
    teacherGenAIHomeRoute,
    teacherPollRoomRoute,
    teacherCreateRoomRoute,
    teacherDashboardRoute,
    teacherProfileRoute,
    teacherSettingsRoute,
    teacherManageRoomsRoute,
    teacherPollAnalysisRoute,
  ]),
  studentLayoutRoute.addChildren([
    studentPollRoomRoute,
    studentJoinRoomRoute,
    studentDashboardRoute,
    studentProfileRoute,
    studentSettingsRoute,
  ]),
]);

// For server-side rendering compatibility
const memoryHistory = typeof window !== 'undefined' ? undefined : createMemoryHistory();

// Create router instance with additional options
export const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  // Use memory history for SSR
  history: memoryHistory,
  // Global not found component
  defaultNotFoundComponent: NotFoundComponent,
  notFoundRoute,
});

// Add a navigation guard for redirecting based on roles
export const useRedirectBasedOnRole = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const path = window.location.pathname;

      // If the user is at root or auth page and already authenticated, redirect to their role's dashboard
      if (path === '/' || path === '/auth') {
        navigate({ to: `/${user.role.toLowerCase()}` });
      }

      // If user is trying to access a different role's route, redirect to their proper route
      else if (
        (path.startsWith('/teacher') && user.role !== 'teacher') ||
        (path.startsWith('/student') && user.role !== 'student')
      ) {
        navigate({ to: `/${user.role.toLowerCase()}` });
      }
    }
  }, [isAuthenticated, user, navigate]);
};

// Export the types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
