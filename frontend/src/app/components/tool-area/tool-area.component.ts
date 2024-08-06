import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../../services/shape.service';
import { LineFactory } from '../../factories/LineFactory';
import { CircleFactory } from '../../factories/CircleFactory';
import { RectangleFactory } from '../../factories/RectangleFactory';
import { TriangleFactory } from '../../factories/TriangleFactory';
import { ShapeFactory } from '../../interface/ShapeFactory';
import { ToolbarService } from '../../services/toolbar.service';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faCaretUp,
  faEraser,
  faMinus,
  faSquare,
  faTrashAlt,
  faMousePointer,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tool-area',
  templateUrl: './tool-area.component.html',
  styleUrls: ['./tool-area.component.scss'],
})
export class ToolAreaComponent implements OnInit {
  public shapeFactories!: ShapeFactory[];
  public selectedShape: ShapeFactory | null = null;

  public faMinus: IconDefinition = faMinus;
  public faSquare: IconDefinition = faSquare;
  public faCircle: IconDefinition = faCircle;
  public faTriangle: IconDefinition = faCaretUp;
  public faEraser: IconDefinition = faEraser;
  public faMousePointer: IconDefinition = faMousePointer;
  public faTrashAlt: IconDefinition = faTrashAlt;

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

  getIcon(factory: ShapeFactory): IconProp | null {
    if (factory.label === 'Line') return faMinus;
    if (factory.label === 'Circle') return faCircle;
    if (factory.label === 'Rectangle') return faSquare;
    if (factory.label === 'Triangle') return faCaretUp;
    if (factory.label === 'Selection') return faMousePointer;

    return null;
  }

  isSelectedLabel(shapeFactory: ShapeFactory): boolean {
    if (!this.selectedShape) return false;
    return this.selectedShape.label === shapeFactory.label;
  }

  deleteSelection(): void {
    // TODO: implement
  }

  clearCanvas(): void {
    // TODO: implement
  }
}
