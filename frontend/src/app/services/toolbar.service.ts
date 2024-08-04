import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShapeFactory } from '../interface/ShapeFactory';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private selectedToolSubject: BehaviorSubject<ShapeFactory | null> =
    new BehaviorSubject<ShapeFactory | null>(null);

  constructor() {}

  setSelectedTool(tool: ShapeFactory): void {
    this.selectedToolSubject.next(tool);
  }

  getSelectedTool(): Observable<ShapeFactory | null> {
    return this.selectedToolSubject.asObservable();
  }

  getCurrentSelectedTool(): ShapeFactory | null {
    return this.selectedToolSubject.getValue();
  }
}
