import {
  Component,
  Input,
  Directive,
  ViewContainerRef,
  ElementRef,
  ContentChildren,
  QueryList
} from "@angular/core";
import { PointDef } from "./point";

@Directive({
  selector: "[viz], svg[viz]"
  // template: `<ng-container headerRowOutlet></ng-container>`
})
export class Viz {}
