import { AfterViewInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
export declare class AppComponent implements AfterViewInit {
    private toastr;
    constructor(toastr: ToastsManager);
    ngAfterViewInit(): void;
    showSuccess(): void;
    showError(): void;
    showWarning(): void;
    showInfo(): void;
    showClickToDismiss(): void;
    showCustomLife(): void;
    showCustomHTML(): void;
}
