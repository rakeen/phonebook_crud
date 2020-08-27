import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import contactRouter from './routes.js';

const app = new Koa();
const router = new Router();

app.use(mount('/', serve(path.resolve('./q01/build/'))));
app.use(mount('/docs', serve('./docs/swagger')));


app.use(async (ctx, next) => {
    /**
     * @see https://github.com/koajs/koa/wiki/Error-Handling#catching-downstream-errors
     * @see https://stackoverflow.com/a/3290369/4437655
     */
    try {
        await next();
    } catch (err) {
        if (err.errors[0]?.constructor?.name === "ValidationErrorItem") {
            ctx.set("X-Status-Reason", "Validation failed");
            ctx.status = 422;
        }
        else ctx.app.emit('error', err, ctx);
    }
});

router
    .get('/healthcheck', ctx => {
        ctx.body = 'koa up and running!';
    })

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(contactRouter.routes())
    .use(contactRouter.allowedMethods());


const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.info(`🖥️  koa server started on port ${port}`);
});

export { server };