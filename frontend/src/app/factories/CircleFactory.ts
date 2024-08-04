import { Injectable } from '@angular/core';
import { AbstractFactory } from './AbstractFactory';
import { ShapeService } from '../services/shape.service';
import { Point2D } from '../model/Point2D';
import { ShapeFactory } from '../interface/ShapeFactory';
import { Circle } from '../model/Circle'

@Injectable({
  providedIn: 'root',
})
export class CircleFactory extends AbstractFactory<Circle> implements ShapeFactory {
  constructor(shapeManager: ShapeService) {
    super(shapeManager, 'Kreis');
  }

  createShape(from: Point2D, to: Point2D): Circle {
    return new Circle(from, this.computeRadius(from, to.x, to.y));
  }

  private computeRadius(from: Point2D, x: number, y: number): number {
    const xDiff = from.x - x,
      yDiff = from.y - y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
}
