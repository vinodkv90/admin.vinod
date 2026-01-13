/**
 * contact-form controller
 */

import { factories } from '@strapi/strapi'
import Joi from 'joi';

export default factories.createCoreController('api::contact-form.contact-form', ({ strapi }) => ({
    async create(ctx) {
        const { name, email, phone, subject, message } = ctx.request.body;

        const contactSchema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
            subject: Joi.string().max(50).optional(),
            message: Joi.string().max(250).optional(),
        });

        try {
            const { error, value } = contactSchema.validate({ name, email, phone, subject, message }, {
                abortEarly: false,
                stripUnknown: true, // removes fields not in schema
            });
            if (error) {
                ctx.response.status = 400;
                return { error: error.details.map((err) => err.message).join(', ') };
            }
            const data = await strapi.documents('api::contact-form.contact-form').create({ data: value, ctx });

            return ctx.send({ message: "Successfully saved!", data });
        } catch (err) {
            console.error('Validation error:', err);
            ctx.response.status = 500;
            return { error: 'Internal server error' };
        }

    }
}))