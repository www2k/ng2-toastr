import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastContainer} from './toast-container.component';
import {ToastsManager} from './toast-manager';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastContainer],
  exports: [ToastContainer],
  providers: [ToastsManager],
  entryComponents: [ToastContainer]
})
export class ToastModule {

}