import {Component, Optional, transition, state, trigger, style, animate} from '@angular/core';
import {Toast} from './toast';
import {ToastOptions} from './toast-options';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'toast-container',
  template: `
    <div id="toast-container" [style.position]="position" class="{{positionClass}}">
      <div *ngFor="let toast of toasts" [@flyInOut]="toast.state" class="toast toast-{{toast.type}}" (click)="dismiss(toast)">
        <div *ngIf="toast.title" class="{{toast.titleClass || titleClass}}">{{toast.title}}</div>
        <div [ngSwitch]="toast.enableHTML">
          <span *ngSwitchCase="true" [innerHTML]="sanitizer.bypassSecurityTrustHtml(toast.message)"></span>
          <span *ngSwitchDefault class="{{toast.messageClass || messageClass}}">{{toast.message}}</span>
        </div>              
      </div>
    </div>
    `,
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ],
})
export class ToastContainer {
  position = 'fixed';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  positionClass = 'toast-top-right';
  toasts: Toast[] = [];
  maxShown = 5;

  constructor(private sanitizer: DomSanitizer,
              @Optional() options: ToastOptions)
  {
    if (options) {
      Object.assign(this, options);
    }
  }

  addToast(toast: Toast) {
    toast.state = 'in';
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

  dismiss(toast: Toast) {
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
