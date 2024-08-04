import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../../services/shape.service';
import { LineFactory } from '../../factories/LineFactory';
import { CircleFactory } from '../../factories/CircleFactory';
import { RectangleFactory } from '../../factories/RectangleFactory';
import { TriangleFactory } from '../../factories/TriangleFactory';
import { ShapeFactory } from '../../interface/ShapeFactory';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-tool-area',
  templateUrl: './tool-area.component.html',
  styleUrls: ['./tool-area.component.scss'],
})
export class ToolAreaComponent implements OnInit {
  shapeFactories!: ShapeFactory[];
  selectedShape: ShapeFactory | null = null;

  constructor(
    private toolbarService: ToolbarService,
    private lineFactory: LineFactory,
    private circleFactory: CircleFactory,
    private rectangleFactory: RectangleFactory,
    private triangleFactory: TriangleFactory
  ) {}

  ngOnInit(): void {
    this.shapeFactories = [
      this.lineFactory,
      this.circleFactory,
      this.rectangleFactory,
      this.triangleFactory,
    ];

    this.toolbarService.getSelectedTool().subscribe((tool) => {
      this.selectedShape = tool;
    });
  }

  selectFactory(factory: ShapeFactory): void {
    this.toolbarService.setSelectedTool(factory);
  }
}
