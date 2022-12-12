import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'um-matrix',
  template: `
    <canvas width="100%" height="100%" id="canv"></canvas>
  `,
  styleUrls: ['./matrix.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixComponent implements AfterViewInit, OnDestroy {

  interval;

  constructor(private ref: ElementRef) {
  }

  // source: https://dev.to/gnsp/making-the-matrix-effect-in-javascript-din
  ngAfterViewInit() {
    const canvas = document.getElementById('canv') as any;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = this.ref.nativeElement.offsetWidth;
    const h = canvas.height = this.ref.nativeElement.offsetHeight;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);

    function matrix() {
      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';
      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 20;
        }
      });
    }

    this.interval = setInterval(matrix, 50);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
