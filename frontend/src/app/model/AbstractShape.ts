export abstract class AbstractShape {
  private static counter: number = 0;
  readonly id: number;
  constructor() {
    this.id = AbstractShape.counter++;
  }
}
