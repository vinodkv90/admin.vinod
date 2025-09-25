/**
 * home controller
 */

import { factories } from '@strapi/strapi'
import queryProcessor from '../../../../utils/queryProcessor';

export default factories.createCoreController('api::home.home', ({strapi}) => ({
    async find(ctx) {
        const data = await strapi.documents('api::home.home').findFirst({
            status: 'published',
            populate: {
                widgets: {
                on: {
                    "home.hero": {
                        populate: {
                            image: true
                        }
                    },
                    "contact.follow": {
                        populate: {
                            links: true
                        }
                    },
                }
            }
            }
        });
        const parsedData = await queryProcessor({ strapi }).getCommonResponse(data);
        return parsedData;
    },
}));
