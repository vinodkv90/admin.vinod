/**
 * header service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::header.header',({ strapi }) => ({
    async findOne() {
        const data = await strapi.documents('api::header.header').findFirst({
            status: 'published',
            populate: {
                logo: true,
                menu: true,
                contact_button: true
            }
        });
        return {
            logo: {
                url: data.logo?.url || null,
                title: data.logo?.title || null,
                description: data.logo?.description || null,
            },
            menu: data?.menu?.length > 0 ? data.menu.map((item, index) => ({
                id: index+1,
                name: item?.name || null,
                link: item?.url || null,
            })) : [],
            contact_button: {
                name: data.contact_button?.name || null,
                link: data.contact_button?.url || null,
            }
        }
    }
}));
