import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {ToastsManager} from './toast-manager';

@Component({
  selector: 'root',
  providers: [ToastsManager],
  template: `
    <button class="btn btn-default" (click)="showSuccess()">Toastr Tester</button>
  `,
})
export class RootComponent {
  constructor(public toastr: ToastsManager) {
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
}

bootstrap(RootComponent);