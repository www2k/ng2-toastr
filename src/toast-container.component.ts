import {Component, Optional, ViewChild, transition, state, trigger, style, animate, AfterViewInit} from '@angular/core';
import {Toast} from './toast';
import {ToastOptions} from './toast-options';
import {DomSanitizer, EventManager} from '@angular/platform-browser';

@Component({
  selector: 'toast-container',
  template: `
    <div #toastContainer id="toast-container" [style.position]="position" class="{{positionClass}}">
      <div *ngFor="let toast of toasts" [@inOut]="animate" class="toast toast-{{toast.type}}" 
      (click)="clicked(toast)" (swiperight)="swiped($event)">
        <div *ngIf="toast.title" class="{{toast.config.titleClass || titleClass}}">{{toast.title}}</div>
        <div [ngSwitch]="toast.config.enableHTML">
          <span *ngSwitchCase="true" [innerHTML]="sanitizer.bypassSecurityTrustHtml(toast.message)"></span>
          <span *ngSwitchDefault class="{{toast.config.messageClass || messageClass}}">{{toast.message}}</span>
        </div>              
      </div>
    </div>
    `,
  animations: [
    trigger('inOut', [
      state('flyRight, flyLeft', style({opacity: 1, transform: 'translateX(0)'})),
      state('fade', style({opacity: 1})),
      state('slideDown, slideUp', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => flyRight', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('flyRight => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ]),
      transition('void => flyLeft', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('flyLeft => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ]),
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
      ]),
      transition('void => slideDown', [
        style({
          opacity: 0,
          transform: 'translateY(-200%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('slideDown => void', [
        animate('0.3s 10 ease-out', style({
          opacity: 0,
          transform: 'translateY(-200%)'
        }))
      ]),
      transition('void => slideUp', [
        style({
          opacity: 0,
          transform: 'translateY(200%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('slideUp => void', [
        animate('0.3s 10 ease-out', style({
          opacity: 0,
          transform: 'translateY(200%)'
        }))
      ]),
    ]),
  ],
})
export class ToastContainer implements AfterViewInit {
  position = 'fixed';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  positionClass = 'toast-top-right';
  toasts: Toast[] = [];
  maxShown = 5;
  newestOnTop = false;
  animate: string = 'fade';

  public onToastClicked: (toast: Toast) => void;
  @ViewChild('toastContainer') container;

  constructor(private sanitizer: DomSanitizer,
              private eventManager: EventManager,
              @Optional() options: ToastOptions)
  {
    if (options) {
      Object.assign(this, options);
    }
  }

  ngAfterViewInit() {
    console.log(this.container);
    this.eventManager.addEventListener(this.container.nativeElement, 'swipe', (event) => {
      console.log(event);
    });
  }

  addToast(toast: Toast) {
    if (this.positionClass.indexOf('top') > 0) {
      if (this.newestOnTop) {
        this.toasts.unshift(toast);
      } else {
        this.toasts.push(toast);
      }

      if (this.toasts.length > this.maxShown) {
        const diff = this.toasts.length - this.maxShown;

        if (this.newestOnTop) {
          this.toasts.splice(this.maxShown);
        } else {
          this.toasts.splice(0, diff);
        }
      }
    } else {
      this.toasts.unshift(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(this.maxShown);
      }
    }
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => {
      return t.id !== toast.id;
    });
  }

  removeAllToasts() {
    this.toasts = [];
  }

  clicked(toast: Toast) {
    if (this.onToastClicked) {
      this.onToastClicked(toast);
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

  swiped(event: any) {
    console.log(event);
  }
}
