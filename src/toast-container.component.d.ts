import { Toast } from './toast';
import { DomSanitizer } from '@angular/platform-browser';
export declare class ToastContainer {
    private sanitizer;
    position: string;
    messageClass: string;
    titleClass: string;
    positionClass: string;
    toasts: Toast[];
    maxShown: number;
    constructor(sanitizer: DomSanitizer, options: any);
    addToast(toast: Toast): void;
    removeToast(toastId: number): void;
    removeAllToasts(): void;
    dismiss(toast: any): void;
    anyToast(): boolean;
    findToast(toastId: number): Toast | void;
}
