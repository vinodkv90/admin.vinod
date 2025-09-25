/**
 * project-listing controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::project-listing.project-listing', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::project-listing.project-listing').getProjectList(ctx);
  },
}));
