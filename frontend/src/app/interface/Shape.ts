export interface Shape {
    readonly id: number;
    draw(ctx: CanvasRenderingContext2D): void;
  }