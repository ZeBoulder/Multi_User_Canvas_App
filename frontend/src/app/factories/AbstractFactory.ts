import { Inject } from '@angular/core';
import { Point2D } from '../model/Point2D';
import { Shape } from '../interface/Shape';
import { ShapeFactory } from '../interface/ShapeFactory';
import { ShapeService } from '../services/shape.service';

export abstract class AbstractFactory<T extends Shape> implements ShapeFactory {
  private from: Point2D | undefined;
  private tmpTo: Point2D | undefined;
  private tmpShape: T | undefined;

  constructor(
    @Inject(ShapeService) protected shapeManager: ShapeService,
    public label: string
  ) {}

  abstract createShape(from: Point2D, to: Point2D): T;

  handleMouseDown(x: number, y: number): void {
    this.from = new Point2D(x, y);
  }

  handleMouseUp(x: number, y: number): void {
    if (this.tmpShape) {
      this.shapeManager.removeShapeWithId(this.tmpShape.id, false);
    }
    this.shapeManager.addShape(this.createShape(this.from!, new Point2D(x, y)));
    this.from = undefined;
  }

  handleMouseMove(x: number, y: number): void {
    if (!this.from) {
      return;
    }
    if (!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y) {
      this.tmpTo = new Point2D(x, y);
      if (this.tmpShape) {
        this.shapeManager.removeShapeWithId(this.tmpShape.id, false);
      }
      this.tmpShape = this.createShape(this.from, new Point2D(x, y));
      this.shapeManager.addShape(this.tmpShape);
    }
  }
}
