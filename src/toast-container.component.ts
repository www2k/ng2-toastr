import {Component, Optional, Inject} from '@angular/core';
import {Toast} from './toast';
import {ToastOptions} from './toast-options';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'toast-container',
  template: `
    <div id="toast-container" [style.position]="position" class="{{positionClass}}">
      <div *ngFor="let toast of toasts" class="toast-{{toast.type}}" (click)="dismiss(toast)" [ngSwitch]="toast.enableHTML">
        <div *ngSwitchCase="true">
          <div *ngIf="toast.title" [innerHTML]="sanitizer.bypassSecurityTrustHtml(toast.title)"></div>
          <div [innerHTML]="sanitizer.bypassSecurityTrustHtml(toast.message)"></div>
        </div> 
        <div *ngSwitchDefault>
          <div *ngIf="toast.title" class="{{toast.titleClass || titleClass}}">{{toast.title}}</div>
          <div class="{{toast.messageClass || messageClass}}">{{toast.message}}</div>
        </div>         
      </div>
    </div>
    `,
})
export class ToastContainer {
  position = 'fixed';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  positionClass = 'toast-top-right';
  toasts: Toast[] = [];
  maxShown = 5;

  constructor(private sanitizer: DomSanitizer,
              @Optional() @Inject(ToastOptions) options)
  {
    if (options) {
      Object.assign(this, options);
    }
  }

  addToast(toast: Toast) {

    if (this.positionClass.indexOf('top') > 0) {
      this.toasts.push(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(0, (this.toasts.length - this.maxShown));
      }
    } else {
      this.toasts.unshift(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
      }
    }

  }

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter((toast) => {
      return toast.id !== toastId;
    });
  }

  removeAllToasts() {
    this.toasts = [];
  }

  dismiss(toast) {
    if (!toast.autoDismiss) {
      this.removeToast(toast.id);
    }
  }

  anyToast(): boolean {
    return this.toasts.length > 0;
  }

  findToast(toastId: number): Toast | void {
    for (let toast of this.toasts) {
      if (toast.id === toastId) {
        return toast;
      }
    }
    return null;
  }
}
