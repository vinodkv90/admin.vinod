"use strict";

import mappings from "./mappings";
import definitions from "./definitions";
import checkComponentsExist from "./component";
import { ParamObj, Widget } from "./interface";

type DefinitionFn<T = unknown> = (widget: Widget, pageData?: any) => T | Promise<T>;
type Definitions<T = unknown> = Record<string, DefinitionFn<T>>;

function isWidgetEnabled(widget: Widget): boolean {
  return widget?.enable_component !== false;
}

function isDeviceCompatible(widget: Widget, requestDevice: string | undefined): boolean {
  if (!requestDevice || widget?.device === undefined || widget?.device === null) {
    return true;
  }
  if (requestDevice === "mobile" && widget.device === "desktop only") {
    return false;
  }
  if (requestDevice === "desktop" && widget.device === "mobile only") {
    return false;
  }
  return true;
}

function getDefinitionKey(widget: Widget): string | undefined {
  return mappings[widget?.__component];
}

export default {
  async getWidgetsData(paramObj: ParamObj): Promise<any[] | null> {
    const widgets = paramObj?.widgets;
    checkComponentsExist(widgets?.map((data) => data?.__component));

    if (!widgets || widgets.length <= 0) {
      return null;
    }

    let requestDevice = strapi.requestContext.get().request.headers["device"];
    if (Array.isArray(requestDevice)) {
      requestDevice = requestDevice[0];
    }
    const structuredWidgets: any[] = [];
    const cloneDefinition: Definitions = { ...definitions };

    for (const widget of widgets) {
      try {
        if (
          !isWidgetEnabled(widget) ||
          !isDeviceCompatible(widget, requestDevice)
        ) {
          continue;
        }

        const definitionKey = getDefinitionKey(widget);
        if (!definitionKey || !cloneDefinition[definitionKey]) {
          continue;
        }

        const structuredWidget = await cloneDefinition[definitionKey](
          widget,
          paramObj?.pageData
        );
        structuredWidgets.push(structuredWidget);
      } catch (err) {
        console.error("Error in getWidgetsData:", err);
      }
    }

    return structuredWidgets;
  },
};
