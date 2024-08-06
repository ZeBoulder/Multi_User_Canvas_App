import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Shape } from '../interface/Shape';
import { ShapeManager } from '../interface/ShapeManager';
import { ShapeFactory } from '../interface/ShapeFactory';
import { ToolbarService } from './toolbar.service';

@Injectable({
  providedIn: 'root',
})
// export class ShapeService implements ShapeManager {
//   private shapes: Shape[] = [];
//   private shapesSubject: BehaviorSubject<Shape[]> = new BehaviorSubject<
//     Shape[]
//   >([]);

//   private currentFactorySubject = new BehaviorSubject<ShapeFactory | null>(
//     null
//   );
//   currentFactory$ = this.currentFactorySubject.asObservable();

//   private currentShapeSubject = new Subject<Shape>();
//   currentShape$ = this.currentShapeSubject.asObservable();

//   constructor(private toolbarService: ToolbarService) {
//     this.toolbarService.getSelectedTool().subscribe((tool) => {
//       this.setCurrentFactory(tool);
//     });
//   }

//   setCurrentFactory(factory: ShapeFactory | null): void {
//     this.currentFactorySubject.next(factory);
//   }

//   handleMouseDown(x: number, y: number): void {
//     this.currentFactorySubject.value?.handleMouseDown(x, y);
//   }

//   handleMouseMove(x: number, y: number): void {
//     this.currentFactorySubject.value?.handleMouseMove(x, y);
//   }

//   handleMouseUp(x: number, y: number): void {
//     this.currentFactorySubject.value?.handleMouseUp(x, y);
//   }

//   getShapes(): Observable<Shape[]> {
//     return this.shapesSubject.asObservable();
//   }

//   addShape(shape: Shape, redraw: boolean = true): this {
//     this.shapes.push(shape);
//     this.updateShapes(redraw);
//     return this;
//   }

//   removeShape(shape: Shape, redraw: boolean = true): this {
//     const index = this.shapes.indexOf(shape);
//     if (index > -1) {
//       this.shapes.splice(index, 1);
//       this.updateShapes(redraw);
//     }
//     return this;
//   }

//   removeShapeWithId(id: number, redraw: boolean = true): this {
//     const index = this.shapes.findIndex((shape) => shape.id === id);
//     if (index > -1) {
//       this.shapes.splice(index, 1);
//       this.updateShapes(redraw);
//     }
//     return this;
//   }

//   private updateShapes(redraw: boolean): void {
//     this.shapesSubject.next([...this.shapes]);
//   }
// }
export class ShapeService implements ShapeManager {
  private shapes: Shape[] = [];
  private shapesSubject: BehaviorSubject<Shape[]> = new BehaviorSubject<
    Shape[]
  >([]);

  private currentFactorySubject = new BehaviorSubject<ShapeFactory | null>(
    null
  );
  currentFactory$ = this.currentFactorySubject.asObservable();

  private currentShapeSubject = new Subject<Shape>();
  currentShape$ = this.currentShapeSubject.asObservable();

  constructor() {}

  setCurrentFactory(factory: ShapeFactory | null): void {
    this.currentFactorySubject.next(factory);
  }

  handleMouseDown(x: number, y: number): void {
    this.currentFactorySubject.value?.handleMouseDown(x, y);
  }

  handleMouseMove(x: number, y: number): void {
    this.currentFactorySubject.value?.handleMouseMove(x, y);
  }

  handleMouseUp(x: number, y: number): void {
    this.currentFactorySubject.value?.handleMouseUp(x, y);
  }

  getShapes(): Observable<Shape[]> {
    return this.shapesSubject.asObservable();
  }

  addShape(shape: Shape, redraw: boolean = true): this {
    this.shapes.push(shape);
    this.updateShapes(redraw);
    return this;
  }

  removeShape(shape: Shape, redraw: boolean = true): this {
    const index = this.shapes.indexOf(shape);
    if (index > -1) {
      this.shapes.splice(index, 1);
      this.updateShapes(redraw);
    }
    return this;
  }

  removeShapeWithId(id: number, redraw: boolean = true): this {
    const index = this.shapes.findIndex((shape) => shape.id === id);
    if (index > -1) {
      this.shapes.splice(index, 1);
      this.updateShapes(redraw);
    }
    return this;
  }

  private updateShapes(redraw: boolean): void {
    this.shapesSubject.next([...this.shapes]);
  }
}
