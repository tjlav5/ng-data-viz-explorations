import { TemplateRef, Directive } from "@angular/core";
/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface VizDef {
  template: TemplateRef<any>;
}

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: "[lineDef]" })
export class LineDef implements VizDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/** Line template container that adds the right classes and role. */
@Directive({
  selector: "g[path]",
  host: {
    class: "line"
  }
})
export class Line {}
