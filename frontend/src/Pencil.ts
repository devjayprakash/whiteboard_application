import { Pos } from './whiteboard';

class Pencil {
  mousePos: Pos;
  paths: Pos[][] = [];
  pencilThickness = 2;

  constructor() {
    this.mousePos = {
      x: 0,
      y: 0,
    };
  }

  updateMouseMos(pos: Pos) {
    this.mousePos = pos;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.pencilThickness + 'px';
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      if (this.paths[i].length > 0) {
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
      }
      ctx.stroke();
    }
  }

  update() {
    this.paths[this.paths.length - 1] &&
      this.paths[this.paths.length - 1].push(this.mousePos);
  }
}

export default Pencil;
