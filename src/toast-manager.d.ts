import { ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { ToastOptions } from './toast-options';
import { Toast } from './toast';
import { Subject } from 'rxjs/Rx';
export declare class ToastsManager {
    private componentFactoryResolver;
    private appRef;
    container: ComponentRef<any>;
    private options;
    private index;
    toastClicked: Subject<Toast>;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, options: ToastOptions);
    show(toast: Toast, options?: Object): Promise<Toast>;
    createTimeout(toast: Toast, timeout?: number): void;
    setupToast(toast: Toast, options?: Object): Toast;
    onToastClicked(toast: Toast): void;
    dismissToast(toast: Toast): void;
    clearToast(toast: Toast): void;
    clearAllToasts(): void;
    dispose(): void;
    error(message: string, title?: string, options?: any): Promise<Toast>;
    info(message: string, title?: string, options?: any): Promise<Toast>;
    success(message: string, title?: string, options?: any): Promise<Toast>;
    warning(message: string, title?: string, options?: any): Promise<Toast>;
    custom(message: string, title?: string, options?: any): Promise<Toast>;
}
