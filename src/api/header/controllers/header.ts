/**
 * header controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.service('api::header.header').findOne(ctx);
    }
}));
