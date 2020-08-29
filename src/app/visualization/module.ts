import { Viz } from "./viz";
import { NgModule } from "@angular/core";
import { Point, PointDef } from "./point";
import { Series, SeriesDef, PlaneOutlet } from "./series";
import { Line, LineDef } from "./line";

const EXPORTED_DECLARATIONS = [
  PlaneOutlet,
  Line,
  LineDef,
  Point,
  PointDef,
  Series,
  SeriesDef,
  Viz
];

@NgModule({
  exports: EXPORTED_DECLARATIONS,
  declarations: EXPORTED_DECLARATIONS,
  imports: []
})
export class VisualizationModule {}
