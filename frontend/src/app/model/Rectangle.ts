import { Point2D } from './Point2D';
import { AbstractShape } from './AbstractShape';
import { Shape } from '../interface/Shape';

export class Rectangle extends AbstractShape implements Shape {
  constructor(readonly from: Point2D, readonly to: Point2D) {
    super();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeRect(
      this.from.x,
      this.from.y,
      this.to.x - this.from.x,
      this.to.y - this.from.y
    );
    ctx.stroke();
  }
}
