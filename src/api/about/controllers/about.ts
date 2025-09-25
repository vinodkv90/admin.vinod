/**
 * about controller
 */

import { factories } from '@strapi/strapi'
import queryProcessor from '../../../../utils/queryProcessor';

export default factories.createCoreController('api::about.about', ({strapi}) => ({
    async find(ctx) {
        const data = await strapi.documents('api::about.about').findFirst({
            status: 'published',
            populate: {
                widgets: {
                    on: {
                        "about.banner": {
                            populate: {
                                image: true
                            }
                        },
                        "about.contact-me": {
                            populate: {
                                contact_medium: true
                            }
                        },
                        "about.my-experience": {
                            populate: {
                                experience: true
                            }
                        },
                        "about.my-skill": {
                            populate: {
                                skills: true
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
