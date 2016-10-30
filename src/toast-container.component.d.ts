import { AfterViewInit } from '@angular/core';
import { Toast } from './toast';
import { ToastOptions } from './toast-options';
import { DomSanitizer } from '@angular/platform-browser';
import { HammerGesturesPlugin } from '@angular/platform-browser/src/dom/events/hammer_gestures';
export declare class ToastContainer implements AfterViewInit {
    private sanitizer;
    private gestures;
    position: string;
    messageClass: string;
    titleClass: string;
    positionClass: string;
    toasts: Toast[];
    maxShown: number;
    newestOnTop: boolean;
    animate: string;
    onToastClicked: (toast: Toast) => void;
    container: any;
    constructor(sanitizer: DomSanitizer, gestures: HammerGesturesPlugin, options: ToastOptions);
    ngAfterViewInit(): void;
    addToast(toast: Toast): void;
    removeToast(toast: Toast): void;
    removeAllToasts(): void;
    clicked(toast: Toast): void;
    anyToast(): boolean;
    findToast(toastId: number): Toast | void;
    swiped(event: any): void;
}
