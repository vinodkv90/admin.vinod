/**
 * contact-form controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-form.contact-form', ({ strapi }) => ({
    async contactFormController(ctx) {
        return await strapi.service('api::contact-form.contact-form').contactFormService(ctx);
    }
}))