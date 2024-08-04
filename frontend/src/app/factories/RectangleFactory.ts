import { Injectable } from '@angular/core';
import { AbstractFactory } from './AbstractFactory';
import { ShapeService } from '../services/shape.service';
import { Point2D } from '../model/Point2D';
import { ShapeFactory } from '../interface/ShapeFactory';
import { Rectangle } from '../model/Rectangle';

@Injectable({
  providedIn: 'root',
})
export class RectangleFactory
  extends AbstractFactory<Rectangle>
  implements ShapeFactory
{
  constructor(shapeManager: ShapeService) {
    super(shapeManager, 'Rechteck');
  }

  createShape(from: Point2D, to: Point2D): Rectangle {
    return new Rectangle(from, to);
  }
}
