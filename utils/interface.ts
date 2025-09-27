export interface Widget {
  __component: string;
  enable_component?: boolean;
  device?: string | null;
  [key: string]: any;
}

export interface ParamObj {
  widgets?: Widget[];
  pageData?: any;
  [key: string]: any;
}

export interface Logo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, any> | null;        // set to a more specific type if you know the formats shape
  hash: string;
  ext: string;
  mime: string;
  size: number;                                // file size (units as in source, e.g. KB)
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, any> | null; // provider-specific metadata (nullable)
  folderPath: string;
  createdAt: string;                           // ISO datetime string
  updatedAt: string;                           // ISO datetime string
  publishedAt: string;                         // ISO datetime string
  locale: string | null;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface Link {
  id: number;
  name: string;
  url: string;
  icon: string;
  external: string | null;
}

export type Links = Link[];


export interface Mail {
  id: number;
  title: string;
  message: string;
  logo: Logo;
  image: Image;
  links: Links;
}

