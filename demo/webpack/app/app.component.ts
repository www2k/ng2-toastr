import {
  Component, ViewContainerRef, ApplicationRef
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

  constructor(private toastr: ToastsManager, containerRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(containerRef);
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!', {toastLife: 3000});
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
    this.toastr.info('Please click to dismiss', 'No auto dismiss', {dismiss: 'click'});
  }

  showCustomLife() {
    this.toastr.warning('The toast will auto dismiss in 8 seconds', null, {toastLife: 8000});
  }

  showCustomHTML() {
    this.toastr.custom('<span style="color: #bd362f">This message should be in red with blank background. Click to dismiss.</span>',
      'Custom Message', {enableHTML: true, dismiss: 'click'});
    this.toastr.info('<span style="color: #bd362f">This should be red, </span><br/><span style="color: #bd362f">and multi-line message.</span>',
      'Custom Information Message', {enableHTML: true, toastLife: 5000});
  }

}