import {Component, Optional, transition, state, trigger, style, animate, ChangeDetectorRef} from '@angular/core';
import {Toast} from './toast';
import {ToastOptions} from './toast-options';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'toast-container',
  template: `
    <div id="toast-container" [style.position]="position" class="{{positionClass}}">
      <div *ngFor="let toast of toasts" [@inOut]="'toast.state'" class="toast toast-{{toast.type}}" (click)="dismiss(toast)">
        <div *ngIf="toast.title" class="{{toast.titleClass || titleClass}}">{{toast.title}}</div>
        <div [ngSwitch]="toast.enableHTML">
          <span *ngSwitchCase="true" [innerHTML]="sanitizer.bypassSecurityTrustHtml(toast.message)"></span>
          <span *ngSwitchDefault class="{{toast.messageClass || messageClass}}">{{toast.message}}</span>
        </div>              
      </div>
    </div>
    `,
  animations: [
    trigger('inOut', [
      state('fly', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => fly', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('fly => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ]),
      state('fade', style({opacity: 1})),
      transition('void => fade', [
        style({
          opacity: 0,
        }),
        animate('0.3s ease-in')
      ]),
      transition('fade => void', [
        animate('0.3s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ]),
  ],
})
export class ToastContainer {
  position = 'fixed';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  positionClass = 'toast-top-right';
  toasts: Toast[] = [];
  maxShown = 5;
  animate: string = 'fade';

  constructor(private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              @Optional() options: ToastOptions)
  {
    if (options) {
      Object.assign(this, options);
    }
  }

  addToast(toast: Toast) {
    toast.state = this.animate;
    this.cdr.detectChanges();

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
