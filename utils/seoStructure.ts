import createHelpers, { frontEndUrl, IMAGE_QUERY } from "./index";
import url from "url";
import { Core } from "@strapi/strapi";

export interface SeoMetadata {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  metaViewport: string;
  canonicalURL: string;
  structuredData: {
    url: string;
    name: string;
    "@type": string;
    image: string;
    sameAs: string[];
    "@context": string;
    jobTitle: string;
    worksFor: {
      name: string;
      "@type": string;
    };
    description: string;
  };
  metaImage: {
    id: number | null;
    url: string | null;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
    caption: string | null;
  };
  openGraph: {
    id: number;
    ogTitle: string;
    ogDescription: string;
    ogUrl: string;
    ogType: string;
    ogImage: {
      id: number | null;
      url: string | null;
      alternativeText: string | null;
      width: number | null;
      height: number | null;
      caption: string | null;
    };
  };
}


export default async function seoStructure(seo) {

  console.log('seo', seo);
  
  if (!seo) {
    return null;
  }

  const seoData: SeoMetadata = {
    id: seo?.id || 0,
    metaTitle: seo?.metaTitle || "",
    metaDescription: seo?.metaDescription || "",
    keywords: seo?.keywords || "",
    metaRobots: seo?.metaRobots || "",
    structuredData: seo?.structuredData || {},
    metaViewport: seo?.metaViewport || "",
    canonicalURL: seo?.canonicalURL || "",
    metaImage: createHelpers(strapi).getImage(seo?.metaImage) || null,
    openGraph: {
      id: seo?.openGraph?.id || 0,
      ogTitle: seo?.openGraph?.ogTitle || 0,
      ogDescription: seo?.openGraph?.ogDescription || 0,
      ogUrl: seo?.openGraph?.ogUrl || 0,
      ogType: seo?.openGraph?.ogType || 0,
      ogImage: createHelpers(strapi).getImage(seo?.openGraph?.ogImage) || null,
    },
  };

  return seoData as SeoMetadata;

}
