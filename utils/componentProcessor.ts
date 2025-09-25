import mappings from "./mappings";
import definitions from "./definitions";
import checkComponentsExist from "./component";

interface Widget {
  __component?: string;
  enable_component?: boolean;
  device?: string | null;
  [key: string]: any;
}

interface ParamObj {
  widgets?: Widget[];
  pageData?: any;
  [key: string]: any;
}

function shouldIncludeWidget(
  widget: Widget,
  requestDevice: string | undefined
): boolean {
  if (widget?.enable_component === false) return false;

  if (
    requestDevice &&
    typeof widget?.device !== "undefined" &&
    widget?.device !== null
  ) {
    if (
      (requestDevice === "mobile" && widget?.device !== "mobile only") ||
      (requestDevice === "desktop" && widget?.device !== "desktop only")
    ) {
      return false;
    }
  }
  return true;
}

async function structureWidget(widget: Widget, pageData: any): Promise<any | null> {
  // clone definitions so each widget gets a fresh copy
  const cloneDefinition = { ...definitions };
  const handlerKey = mappings[widget?.__component ?? ""];
  if (handlerKey && typeof cloneDefinition[handlerKey] === "function") {
    return await cloneDefinition[handlerKey](widget, pageData);
  }
  return null;
}

export default {
  async getWidgetsData(paramObj: ParamObj): Promise<any[] | null> {
    const widgets = paramObj?.widgets;

    checkComponentsExist(widgets?.map((data) => data?.__component));

    if (!widgets || widgets.length === 0) {
      return null;
    }

    const deviceHeader = strapi.requestContext.get().request.headers["device"];
    const requestDevice: string | undefined = Array.isArray(deviceHeader)
      ? deviceHeader[0]
      : deviceHeader;

    const structuredWidgets: any[] = [];

    for (const widget of widgets) {
      try {
        if (!shouldIncludeWidget(widget, requestDevice)) {
          continue;
        }
        const structuredWidget = await structureWidget(widget, paramObj?.pageData);
        if (structuredWidget) {
          structuredWidgets.push(structuredWidget);
        }
      } catch (err) {
        console.error("Error structuring widget:", err);
      }
    }

    return structuredWidgets;
  },
};
