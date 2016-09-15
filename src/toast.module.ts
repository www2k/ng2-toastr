import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastContainer} from './toast-container.component';
import {ToastsManager} from './toast-manager';
import {ToastOptions} from './toast-options';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastContainer],
  exports: [ToastContainer],
  providers: [ToastsManager],
  entryComponents: [ToastContainer]
})
export class ToastModule {
  static forRoot(config: ToastOptions): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [
        {provide: ToastOptions, useValue: config }
      ]
    };
  }
}