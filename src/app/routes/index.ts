import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
