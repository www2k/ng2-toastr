import { ErrorHandler } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
export declare class AppErrorHandler extends ErrorHandler {
    private toastr;
    constructor(toastr: ToastsManager);
    handleError(err: any): void;
}
