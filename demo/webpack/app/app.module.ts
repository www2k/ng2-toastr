/**
 * Created by dereks on 8/24/16.
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';

let options = <ToastOptions>{
  autoDismiss: false,
  positionClass: 'toast-bottom-right',
};

@NgModule({
  imports: [BrowserModule, ToastModule],
  declarations: [AppComponent],
  providers: [{provide: ToastOptions, useValue: options}],
  bootstrap: [AppComponent],
})
export class AppModule {

}
