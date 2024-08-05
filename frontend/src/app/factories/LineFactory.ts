import { Injectable } from '@angular/core';
import { Point2D } from '../model/Point2D';
import { ShapeService } from '../services/shape.service';
import { AbstractFactory } from './AbstractFactory';
import { Line } from '../model/Line';
import { ShapeFactory } from '../interface/ShapeFactory';

@Injectable({
  providedIn: 'root',
})
export class LineFactory extends AbstractFactory<Line> implements ShapeFactory {
  // public override label: string = 'Linie';

  constructor(shapeManager: ShapeService) {
    super(shapeManager, 'Line');
  }

  createShape(from: Point2D, to: Point2D): Line {
    return new Line(from, to);
  }
}
