import { ComponentRef, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Toast } from './toast';
export declare class ToastsManager {
    private componentFactoryResolver;
    private appRef;
    private injector;
    container: ComponentRef<any>;
    private options;
    private index;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector, options: any);
    show(toast: Toast): void;
    createTimeout(toastId: number): void;
    setupToast(toast: Toast): void;
    clearToast(toastId: number): void;
    dispose(): void;
    error(message: string, title?: string): void;
    info(message: string, title?: string): void;
    success(message: string, title?: string): void;
    warning(message: string, title?: string): void;
}
