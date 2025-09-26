/**
 * project-listing service
 */

import { Core, factories } from '@strapi/strapi';
import createHelpers from '../../../../utils';

export default factories.createCoreService('api::project-listing.project-listing', ({ strapi }) => ({
  async getProjectList(ctx) {
    const data = await strapi.documents('api::project-listing.project-listing').findFirst({
      status: 'published',
      populate: {
        projects: {
          populate: {
            image: true
          }
        }
      },
      orderBy: { createdAt: 'DESC' }
    });
    return {
        title: data?.title,
        description: data?.description,
        projects: data?.projects?.map(item => {
            return {
              title: item?.title,
              description: item?.description,
              image: item?.image ? createHelpers(strapi).getImage(item?.image) : null,
              is_large: item?.is_large,
            }
        }) || []
    };
  }
}));
