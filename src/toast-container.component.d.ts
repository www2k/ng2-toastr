import { Toast } from './toast';
export declare class ToastContainer {
    position: string;
    messageClass: string;
    titleClass: string;
    positionClass: string;
    toasts: Toast[];
    maxShown: number;
    constructor(options: any);
    addToast(toast: Toast): void;
    removeToast(toastId: number): void;
    removeAllToasts(): void;
    dismiss(toast: any): void;
    anyToast(): boolean;
    findToast(toastId: number): Toast | void;
}
