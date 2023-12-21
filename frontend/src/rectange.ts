import { Pos } from './whiteboard';

interface RectProps {
  pos: Pos;
  width: number;
  height: number;
}

class Rectangle {
  rects: RectProps[] = [];
  isDrawing: boolean = false;
  isMouseDown: boolean = false;
  mousePos: Pos = { x: 0, y: 0 };
  currentRect?: RectProps;

  constructor() {}

  updateMousePosition = (pos: Pos) => {
    this.mousePos = pos;
  };

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (let i = 0; i < this.rects.length; i++) {
      const rect = this.rects[i];
      ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height);
    }
    if (this.currentRect) {
      ctx.rect(
        this.currentRect.pos.x,
        this.currentRect.pos.y,
        this.currentRect.width,
        this.currentRect.height
      );
    }
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (this.currentRect) {
      this.currentRect.width = this.mousePos.x - this.currentRect.pos.x;
      this.currentRect.height = this.mousePos.y - this.currentRect.pos.y;
    }
  }
}

export default Rectangle;
