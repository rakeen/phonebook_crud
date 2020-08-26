import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import contactRouter from './routes.js';

const app = new Koa();
const router = new Router();
router
    .get('/', ctx => {
        ctx.body = 'Hello koa!';
    })

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(contactRouter.routes())
    .use(contactRouter.allowedMethods());

const server = app.listen(process.env.PORT || 3001);

export { server };