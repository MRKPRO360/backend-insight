import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
