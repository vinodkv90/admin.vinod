// ./src/utils/add-column-schema.ts

import { Core } from '@strapi/strapi';

export default async function addColumnSchema(strapi: Core.Strapi) {
  const schema = {
    type: 'boolean',
    default: true,
  };

  const columnName = 'enable_component';

  const updateComponentList: string[] = [
    'common.content-area',
  ];

  for (const key in strapi.components) {
    const component = strapi.components[key];
    if (updateComponentList.includes(component?.uid)) {
      component.attributes[columnName] = schema;
      if (component.__schema__?.attributes) {
        component.__schema__.attributes[columnName] = schema;
      }
    }
  }
}
