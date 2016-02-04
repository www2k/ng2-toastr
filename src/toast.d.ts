import { ComponentRef, DynamicComponentLoader, ApplicationRef, Injector } from 'angular2/core';
export declare class Toast {
    type: string;
    message: string;
    title: string;
    id: number;
    constructor(type: string, message: string, title?: string);
}
export declare class ToastsManager {
    private loader;
    private appRef;
    private injector;
    container: ComponentRef;
    private options;
    private index;
    constructor(loader: DynamicComponentLoader, appRef: ApplicationRef, injector: Injector, options: any);
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
