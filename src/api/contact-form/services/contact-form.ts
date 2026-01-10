/**
 * contact-form service
 */

import { factories } from '@strapi/strapi';
import Joi from "joi";
// import { sendMail } from '../../../../utils/sendMail';
import { sendMailAdmin } from '../../../../utils/senMailAdmin';

export default factories.createCoreService('api::contact-form.contact-form', ({ strapi }) => ({
    async contactFormService(ctx) {
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

            const data = await strapi.documents('api::contact-form.contact-form').create({ data: { name, email, phone, subject, message } });

            if(data) {
                await sendMailAdmin(process.env.SMTP_FROM, 'New Enquiry Recieved!', { name, email, phone, sub: subject, message });
                await delay(3000);
                // await sendMail(email, 'Thank you for contacting, will get back to you shortly.', name);
                return ctx.send({ message: "Successfully saved!" });
            }

            return {
                message: 'Thank you for contacting, will get back to you shortly.',
            };

        } catch (err) {
            console.error('Validation error:', err);
        }
    }
}));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));