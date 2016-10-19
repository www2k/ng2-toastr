import {ErrorHandler, Injectable} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private toastr: ToastsManager) {
    super(false);
  }

  handleError(err) {
    this.toastr.error(err.message);
    super.handleError(err);
  }

}