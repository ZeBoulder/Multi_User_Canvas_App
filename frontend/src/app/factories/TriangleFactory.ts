import { Inject, Injectable } from '@angular/core';
import { ShapeFactory } from '../interface/ShapeFactory';
import { Point2D } from '../model/Point2D';
import { Line } from '../model/Line';
import { Triangle } from '../model/Triangle';
import { ShapeService } from '../services/shape.service';

@Injectable({
  providedIn: 'root',
})
export class TriangleFactory implements ShapeFactory {
  public label: string = 'Dreieck';

  private from!: Point2D | undefined;
  private tmpTo!: Point2D | undefined;
  private tmpLine!: Line | undefined;
  private thirdPoint!: Point2D | undefined;
  private tmpShape!: Triangle | undefined;

  constructor(@Inject(ShapeService) protected shapeManager: ShapeService) {}

  handleMouseDown(x: number, y: number) {
    if (this.tmpShape) {
      this.shapeManager.removeShapeWithId(this.tmpShape.id, false);
      this.shapeManager.addShape(
        new Triangle(this.from!, this.tmpTo!, new Point2D(x, y))
      );
      this.from = undefined;
      this.tmpTo = undefined;
      this.tmpLine = undefined;
      this.thirdPoint = undefined;
      this.tmpShape = undefined;
    } else {
      this.from = new Point2D(x, y);
    }
  }

  handleMouseUp(x: number, y: number) {
    if (this.tmpLine) {
      this.shapeManager.removeShapeWithId(this.tmpLine.id, false);
      this.tmpLine = undefined;
      this.tmpTo = new Point2D(x, y);
      this.thirdPoint = new Point2D(x, y);
      this.tmpShape = new Triangle(this.from!, this.tmpTo, this.thirdPoint);
      this.shapeManager.addShape(this.tmpShape);
    }
  }

  handleMouseMove(x: number, y: number) {
    if (!this.from) {
      return;
    }

    if (this.tmpShape) {
      if (
        !this.thirdPoint ||
        this.thirdPoint.x !== x ||
        this.thirdPoint.y !== y
      ) {
        this.thirdPoint = new Point2D(x, y);
        if (this.tmpShape) {
          this.shapeManager.removeShapeWithId(this.tmpShape.id, false);
        }
        this.tmpShape = new Triangle(this.from, this.tmpTo!, this.thirdPoint);
        this.shapeManager.addShape(this.tmpShape);
      }
    } else {
      if (!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y) {
        this.tmpTo = new Point2D(x, y);
        if (this.tmpLine) {
          this.shapeManager.removeShapeWithId(this.tmpLine.id, false);
        }
        this.tmpLine = new Line(this.from, this.tmpTo);
        this.shapeManager.addShape(this.tmpLine);
      }
    }
  }
}
