import Router from 'koa-router';
import Contact from './models/Contact.js';
import database from './models/index.js';

const contactRouter = new Router({ prefix: '/api/v1' })


/**
 * @note We'll have to shift to `POST` method if our search param gets too
 * complicated.
 */
contactRouter.get('/contacts', async (ctx, next) => {
    const mobileNumber = ctx.request?.query?.mobileNumber;
    const whereCondition = mobileNumber ? { "mobileNumber": mobileNumber } : {}
    const users = await Contact.findAll({
        attributes: ['contactId', 'name', 'mobileNumber'], // @info we don't want to leak primary key
        where: {
            ...whereCondition
        }
    });
    ctx.body = users;
});
contactRouter.post('/contacts', async (ctx, next) => {
    const response = await Contact.create(ctx.request.body);
    const { mobileNumber, name, contactId } = response.toJSON();
    ctx.status = 201;
    ctx.body = { mobileNumber, name, contactId };
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

    // @see https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update:~:text=The%20first%20element%20is%20always%20the%20number%20of%20affected%20rows
    if (response[0] > 0) ctx.status = 204;
    else ctx.status = 404;
});


export default contactRouter;