import { Core } from '@strapi/strapi';
import componentProcessor from './componentProcessor';
import seoStructure from './seoStructure';

export interface GetPageDataOptions {
  uid: string;
  query?: Record<string, any>;
  whereQuery?: Record<string, any>;
}

export interface CommonResponse {
  data: {
    seo: Record<string, any>;
    widgets?: any[];
  };
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async getPageData({ uid, query = {}, whereQuery = {} }: GetPageDataOptions) {
    const queryEntity = strapi.db.query(uid);

    const data = await queryEntity.findOne({
      ...query,
      ...whereQuery,
    });

    if (!data) {
      return null;
    }

    return data;
  },

  async getCommonResponse(data: any): Promise<CommonResponse> {
    const allWidgets = await componentProcessor.getWidgetsData({
      widgets: data?.widgets,
      pageData: data,
    });

    let seoData = {};
    if(data?.seo) {
      seoData = await seoStructure(data?.seo);
    }

    const response: CommonResponse = {
      data: {
        seo: seoData,
      },
    };

    if (allWidgets?.length > 0) {
      response.data.widgets = allWidgets;
    }

    return response;
  },
});
