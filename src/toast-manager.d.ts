import { ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { ToastOptions } from './toast-options';
import { Toast } from './toast';
export declare class ToastsManager {
    private componentFactoryResolver;
    private appRef;
    container: ComponentRef<any>;
    private options;
    private index;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, options: ToastOptions);
    show(toast: Toast, options?: any): Promise<Toast>;
    createTimeout(toastId: number, timeout?: number): void;
    setupToast(toast: Toast, options?: any): Toast;
    onToastClicked(toast: Toast): void;
    dismissToast(toast: Toast): void;
    clearToast(toastId: number): void;
    clearAllToasts(): void;
    dispose(): void;
    error(message: string, title?: string, options?: any): Promise<Toast>;
    info(message: string, title?: string, options?: any): Promise<Toast>;
    success(message: string, title?: string, options?: any): Promise<Toast>;
    warning(message: string, title?: string, options?: any): Promise<Toast>;
    custom(message: string, title?: string, options?: any): Promise<Toast>;
}
