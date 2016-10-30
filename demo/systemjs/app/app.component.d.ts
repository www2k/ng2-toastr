import { ToastsManager } from 'ng2-toastr/ng2-toastr';
export declare class AppComponent {
    private toastr;
    constructor(toastr: ToastsManager);
    showSuccess(): void;
    showError(): void;
    showWarning(): void;
    showInfo(): void;
    showClickToDismiss(): void;
    showCustomLife(): void;
    showControlled(): void;
    swiped(event: any): void;
    showCustomHTML(): void;
}
