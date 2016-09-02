import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastContainer} from './toast-container.component';
import {ToastOptions} from './toast-options';
import {ToastsManager} from './toast-manager';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastContainer],
  exports: [ToastContainer]
})
export class ToastModule {

}