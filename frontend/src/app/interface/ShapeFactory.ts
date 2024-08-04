export interface ShapeFactory {
    label: string;
    handleMouseDown(x: number, y: number): void;
    handleMouseUp(x: number, y: number): void;
    handleMouseMove(x: number, y: number): void;
  }