import { Widget } from "./interface";
import createHelpers from ".";
import { title } from "process";

export default {
  getHeroData: async (widget: Widget, pageData?: any) => {
    return {
      widgetType: 'heroWidget',
      data: {
        title: widget?.title,
        description: widget?.description,
        image: widget?.image ? createHelpers(strapi).getImage(widget?.image) : null,
      },
      component: widget?.__component
    }
  },
  getFollowData: async (widget: Widget, pageData?: any) => {
    return {
      widgetType: 'followWidget',
      data: {
        title: widget?.title,
        links: widget?.links?.map((link: any) => ({
          name: link.name,
          url: link.url,
          icon: link.icon,
          external: link.external ?? false
        }))
      },
      component: widget?.__component
    }
  },
  getAboutBannerData: async (widget: Widget, pageData?: any) => {
    return {
      widgetType: 'aboutBannerWidget',
      data: {
        title: widget?.title,
        image: widget?.image ? createHelpers(strapi).getImage(widget?.image) : null,
      },
      component: widget?.__component
    }
  },
  getContactMeData: async (widget: Widget, pageData?: any) => {
    return {
      widgetType: 'contactMeWidget',
      data: {
        title: widget?.title,
        description: widget?.description,
        contact_medium: widget?.contact_medium?.map((medium: any) => ({
          id: medium?.id,
          name: medium?.name,
          url: medium?.url,
          icon: medium?.icon,
          external: medium?.external
        })),
      },
      component: widget?.__component
    }
  },
  getMyExperienceData: async (widget: Widget, pageData?: any) => {
    return {
      widgetType: 'myExperienceWidget',
      data: {
        title: widget?.title,
        experiences: widget?.experience?.map((exp: any) => ({
          title: exp?.title,
          designation: exp?.designation,
          duration: exp?.duration,
        }))
      },
      component: widget?.__component
    }
  },
  getMySkillData: async (widget: Widget, pageData?: any) => {
      return {
        widgetType: 'mySkillWidget',
        data: {
          title: widget?.title,
          skills: widget?.skills?.map((skill: any) => ({
            title: skill?.title,
            description: skill?.description
          }))
        },
        component: widget?.__component
      }
    }
  }