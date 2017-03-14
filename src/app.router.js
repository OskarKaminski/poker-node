import router from 'koa-router';
import {api} from './api/api.router';
const appRouter = router();

appRouter.get('/', function (ctx) {
  ctx.body = 'Poker backend';
});

appRouter.use('/api', api.routes());

export const mountAPI = app => {
  app.use(appRouter.routes());
}
