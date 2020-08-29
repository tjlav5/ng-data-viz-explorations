import {
  Component,
  Directive,
  TemplateRef,
  Input,
  ContentChildren,
  QueryList,
  ViewContainerRef,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { PointDef } from "./point";
import { LineDef } from "./line";
import { line } from "d3-shape";

/** Base interface for a cell definition. Captures a column's cell template definition. */
export interface VizDef {
  template: TemplateRef<any>;
}

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({ selector: "[seriesDef]" })
export class SeriesDef implements VizDef {
  constructor(/** @docs-private */ public template: TemplateRef<any>) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
@Directive({ selector: "[planeOutlet]" })
export class PlaneOutlet {
  constructor(
    public viewContainer: ViewContainerRef,
    public elementRef: ElementRef
  ) {}
}

/** Series template container that adds the right classes and role. */
@Component({
  selector: "g[series]",
  host: {
    class: "series"
  },
  template: "<ng-container planeOutlet></ng-container>",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Series {
  @Input() name: string;
  @Input() data: [number, number][];

  @ViewChild(PlaneOutlet, { static: true }) planeOutlet: PlaneOutlet;

  @ContentChildren(PointDef) _pointDefs: QueryList<PointDef>;
  @ContentChildren(LineDef) _lineDefs: QueryList<LineDef>;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this._pointDefs.map((foo) => {
      this.data.map((d) => {
        console.log(foo, d);
        this.planeOutlet.viewContainer.createEmbeddedView(foo.template, {
          $implicit: d
        });
      });
    });

    this._lineDefs.map((foo) => {
      this.planeOutlet.viewContainer.createEmbeddedView(foo.template, {
        $implicit: line()(this.data)
      });
    });

    this._pointDefs.changes.subscribe(() => {
      console.log("point changes");
      this._pointDefs.map((foo) => {
        this.data.map((d) => {
          console.log(foo);
          this.planeOutlet.viewContainer.createEmbeddedView(foo.template, {
            $implicit: d
          });
        });
      });
    });

    // this._changeDetectorRef.markForCheck();

    // this._pointDefs.changes.subscribe((p) => {
    //   console.log({ p });
    //   p.map((foo) => {
    //     console.log(foo);
    //     this.planeOutlet.viewContainer.createEmbeddedView(foo, {});
    //   });
    // });
  }
}
