import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Shape } from '../../interface/Shape';
import { ToolbarService } from '../../services/toolbar.service';
import { Subscription } from 'rxjs';
import { ShapeFactory } from '../../interface/ShapeFactory';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;

  private shapesSubscription!: Subscription;
  private toolbarSubscription!: Subscription;

  constructor(
    private toolbarService: ToolbarService,
    private shapeService: ShapeService
  ) {}

  ngOnInit(): void {
    this.toolbarSubscription = this.toolbarService
      .getSelectedTool()
      .subscribe((tool) => {
        // console.log('Selected tool:', tool);
        this.shapeService.setCurrentFactory(tool);
      });

    this.shapesSubscription = this.shapeService.getShapes().subscribe(() => {
      this.draw();
    });
  }

  ngAfterViewInit(): void {
    const canvasDomElement = this.canvasRef.nativeElement;
    const { width, height } = canvasDomElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.ctx = canvasDomElement.getContext('2d')!;
    this.setupEventListeners(canvasDomElement);
  }

  private setupEventListeners(canvasDomElement: HTMLCanvasElement): void {
    canvasDomElement.addEventListener(
      'mousemove',
      this.handleMouseMove.bind(this)
    );
    canvasDomElement.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this)
    );
    canvasDomElement.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private handleMouseMove(e: MouseEvent): void {
    this.handleMouseEvent(e, 'handleMouseMove');
  }

  private handleMouseDown(e: MouseEvent): void {
    this.handleMouseEvent(e, 'handleMouseDown');
  }

  private handleMouseUp(e: MouseEvent): void {
    this.handleMouseEvent(e, 'handleMouseUp');
  }

  private handleMouseEvent(
    e: MouseEvent,
    methodName: 'handleMouseMove' | 'handleMouseDown' | 'handleMouseUp'
  ): void {
    e = e || window.event;

    if ('object' === typeof e) {
      const x = e.pageX - this.canvasRef.nativeElement.offsetLeft;
      const y = e.pageY - this.canvasRef.nativeElement.offsetTop;
      if (e.button === 0) {
        this.shapeService[methodName](x, y);
      }
    }
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.stroke();

    this.ctx.fillStyle = 'black';
    this.shapeService.getShapes().subscribe((shapes) => {
      shapes.forEach((shape) => shape.draw(this.ctx));
    });
  }

  ngOnDestroy(): void {
    this.toolbarSubscription?.unsubscribe();
    this.shapesSubscription?.unsubscribe();
  }
}
