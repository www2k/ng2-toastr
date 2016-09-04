import {Injectable} from '@angular/core';

@Injectable()
export class ToastOptions {
  messageClass: string;
  titleClass: string;
  positionClass: string;
  autoDismiss: boolean;
  maxShown: number;
  toastLife: number;
  enableHTML: boolean = false;

  constructor(options: Object) {
    Object.assign(this, options);
  }
}
