import { Component } from '@angular/core'

// The three interlocked lenses and the ring of the Winden knot.
@Component({
  selector: 'wormhole-triquetra',
  template: `
    <svg viewBox="-1.3 -1.3 2.6 2.6" aria-hidden="true" focusable="false">
      <circle cx="0" cy="0" r="1.2" />
      <path d="M0 -1A1.1 1.1 0 0 1 0 .5A1.1 1.1 0 0 1 0 -1Z" />
      <path d="M.866 .5A1.1 1.1 0 0 1 -.433 -.25A1.1 1.1 0 0 1 .866 .5Z" />
      <path d="M-.866 .5A1.1 1.1 0 0 1 .433 -.25A1.1 1.1 0 0 1 -.866 .5Z" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
      line-height: 0;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: .07;
      stroke-linejoin: round;
    }
  `
})
export class TriquetraComponent {}
