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