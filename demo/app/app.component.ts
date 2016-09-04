import {
  Component
} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-app',
  template:  `
      <h1> Angular 2 Toastr Demo.</h1>
      <div style="border: .2rem solid #f7f7f9; position: relative; margin: 1rem -1rem; padding: 10px;">
        <button type="button" class="btn btn-success" (click)="showSuccess()">Success</button>
        <button type="button" class="btn btn-info" (click)="showInfo()">Information</button>
        <button type="button" class="btn btn-warning" (click)="showWarning()">Warning</button>
        <button type="button" class="btn btn-danger" (click)="showError()">Error</button>
      </div>
      <div style="border: .2rem solid #f7f7f9; position: relative; margin: 1rem -1rem; padding: 10px;">
        <button type="button" class="btn btn-info" (click)="showClickToDismiss()">Click to Dismiss</button>
        <button type="button" class="btn btn-warning" (click)="showCustomLife()">8-second Toast</button>
        <button type="button" class="btn btn-default" (click)="showCustomHTML()">Custom HTML Toast</button>
      </div>
  `
})
export class AppComponent {

  constructor(private toastr: ToastsManager) {

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

  showClickToDismiss() {
    this.toastr.info('Please click to dismiss', 'No auto dismiss', {autoDismiss: false});
  }

  showCustomLife() {
    this.toastr.warning('The toast will auto dismiss in 8 seconds', null, {toastLife: 8000});
  }

  showCustomHTML() {
    this.toastr.custom('<span style="color: darkred">this should be read</span>',
      '<span style="font-weight: bold; color: blue;">Blue Title</span>', {enableHTML: true, autoDismiss: false});
  }

}