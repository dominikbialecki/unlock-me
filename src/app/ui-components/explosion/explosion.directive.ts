import {Directive, ElementRef, HostListener, Input} from '@angular/core';

// credits https://codepen.io/jeffersonlam/pen/JmWvmw

@Directive({
  selector: '[umExplosion]'
})
export class ExplosionDirective {

  @Input('umExplosion') emoji: string = '⭐';

  private options = {
    radius: 50, // explosion size
    variation: 10, // randomized variation on each point's angle
    points: 5, // number of points in explosion
  };

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('click', ['$event'])
  explode(e) {
    const options = this.options;
    const container = document.createElement('div');
    container.classList.add('particles-container');
    container.style.left = e.clientX + "px";
    container.style.top = e.clientY + "px";
    this.elementRef.nativeElement.appendChild(container);

    for (let i = 0; i < options.points; i++) {
      const referenceAngle = (360 / options.points) * (i + 1);
      const maxAngle = referenceAngle + options.variation;
      const minAngle = referenceAngle - options.variation;

      const angle = this.randomAngleBetween(minAngle, maxAngle);

      const x = Math.cos(angle) * options.radius;
      const y = Math.sin(angle) * options.radius;
      const popup = document.createElement('div');
      popup.textContent = this.emoji;
      popup.classList.add('particle');
      popup.style.top = y + "px";
      popup.style.left = x + "px";
      container.appendChild(popup);
    }

    setTimeout(() => this.elementRef.nativeElement.removeChild(container), 500);
  }

  private randomAngleBetween(minAngle, maxAngle) {
    return (Math.random() * (maxAngle - minAngle) + minAngle) / 180 * Math.PI - Math.PI / 2;
  }

}
