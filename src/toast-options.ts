import {Injectable} from '@angular/core';

export interface ToastConfigurableOptions {
  positionClass?: string;
  maxShown?: number;
  newestOnTop?: boolean;
  animate?: string;

  // override-able properties
  toastLife?: number;
  enableHTML?: boolean;
  dismiss?: 'auto' | 'click' | 'controlled';
  messageClass?: string;
  titleClass?: string;
  showCloseButton?: boolean;
}

@Injectable()
export class ToastOptions implements ToastConfigurableOptions {
  newestOnTop = false;
  animate = 'fade';

  // override-able properties
  enableHTML = false;
  showCloseButton = false;

  constructor(options: ToastConfigurableOptions) {
    Object.assign(this, options);
  }
}
