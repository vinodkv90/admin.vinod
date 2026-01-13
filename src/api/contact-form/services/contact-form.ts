/**
 * contact-form service
 */

import { factories } from '@strapi/strapi';
import Joi from "joi";
// import { sendMail } from '../../../../utils/sendMail';
import { sendMailAdmin } from '../../../../utils/senMailAdmin';

export default factories.createCoreService('api::contact-form.contact-form', ({ strapi }) => ({
    async contactFormService(data, ctx) {
        const { name, email, phone, subject, message } = data;

        try {

            const data = await strapi.documents('api::contact-form.contact-form').create({ data: { name, email, phone, subject, message }, ctx });

            if(data) {
                await sendMailAdmin(process.env.SMTP_FROM, 'New Enquiry Recieved!', { name, email, phone, sub: subject, message });
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