import Router from 'koa-router';
import Contact from './models/Contact.js';
import database from './models/index.js';

const contactRouter = new Router({ prefix: '/api/v1' })


/**
 * @note We'll have to shift to `POST` method if our search param gets too
 * complicated.
 */
contactRouter.get('/contacts', async (ctx, next) => {
    const isMobileNumber = mobileNumber => /^(\+88)?01\d{9}$/.test(mobileNumber);
    const condition = {};
    const mobileNumber = ctx.request?.query?.mobileNumber;
    if (isMobileNumber(mobileNumber)) condition.mobileNumber = mobileNumber;

    const users = await Contact.findAll({
        attributes: ['contactId', 'name', 'mobileNumber'], // @info we don't want to leak primary key
        where: {
            ...condition
        }
    });
    ctx.body = users;
});
contactRouter.post('/contacts', async (ctx, next) => {
    await database.sync();
    const contact = await Contact.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = ctx.request.body;
    // @todo handle bad req error
});
contactRouter.delete('/contacts/:contactId', async ctx => {
    const response = await Contact.destroy({
        where: {
            contactId: ctx.params.contactId
        }
    });
    if (response > 0) ctx.status = 204;
    else ctx.status = 404;
});
contactRouter.patch('/contacts/:contactId', async ctx => {
    const response = await Contact.update(ctx.request.body, {
        where: {
            contactId: ctx.params.contactId
        }
    });
    if (response > 0) ctx.status = 204;
    else ctx.status = 404;
});


export default contactRouter;