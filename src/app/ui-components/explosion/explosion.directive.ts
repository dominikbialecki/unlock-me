import {Directive, ElementRef, HostListener, Input} from '@angular/core';

// credits https://codepen.io/jeffersonlam/pen/JmWvmw

@Directive({
  selector: '[umExplosion]',
  standalone: true
})
export class ExplosionDirective {

  @Input('umExplosion') emoji: string = '⭐';
  @Input() explodeFromCenter: boolean = false;
  @Input() explodeRadius = 50;
  @Input() explodePoints = 5;

  private options = {
    variation: 30, // randomized variation on each point's angle
  };

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('click', ['$event'])
  explode(e) {
    const options = this.options;
    const container = document.createElement('div');
    container.classList.add('particles-container');
    if (!this.explodeFromCenter) {
      container.style.left = e.clientX + "px";
      container.style.top = e.clientY + "px";
    }
    this.elementRef.nativeElement.appendChild(container);

    for (let i = 0; i < this.explodePoints; i++) {
      const referenceAngle = (360 / this.explodePoints) * (i + 1);
      const maxAngle = referenceAngle + Math.random() * options.variation;
      const minAngle = referenceAngle - Math.random() * options.variation;

      const angle = this.randomAngleBetween(minAngle, maxAngle);

      const x = Math.cos(angle) * this.explodeRadius;
      const y = Math.sin(angle) * this.explodeRadius;
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
