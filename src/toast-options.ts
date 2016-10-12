import {Injectable} from '@angular/core';

@Injectable()
export class ToastOptions {
  messageClass: string;
  titleClass: string;
  positionClass: string;
  maxShown: number;
  toastLife: number;
  enableHTML: boolean = false;
  animate: string = 'fade';
  dismiss: 'auto' | 'click' | 'controlled';

  /**
   * @deprecated Since version 1.2. Use dismiss instead.
   */
  autoDismiss: boolean;

  constructor(options: Object) {
    Object.assign(this, options);
  }
}
