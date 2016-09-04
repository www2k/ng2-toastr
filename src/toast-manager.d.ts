import { ComponentRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { Toast } from './toast';
export declare class ToastsManager {
    private componentFactoryResolver;
    private appRef;
    container: ComponentRef<any>;
    private options;
    private index;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, options: any);
    show(toast: Toast, options?: any): void;
    createTimeout(toastId: number, timeout?: number): void;
    setupToast(toast: Toast, options?: any): void;
    clearToast(toastId: number): void;
    clearAllToasts(): void;
    dispose(): void;
    error(message: string, title?: string, options?: any): void;
    info(message: string, title?: string, options?: any): void;
    success(message: string, title?: string, options?: any): void;
    warning(message: string, title?: string, options?: any): void;
}
