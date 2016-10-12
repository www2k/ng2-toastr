export declare class ToastOptions {
    messageClass: string;
    titleClass: string;
    positionClass: string;
    maxShown: number;
    toastLife: number;
    enableHTML: boolean;
    animate: string;
    dismiss: 'auto' | 'click' | 'controlled';
    /**
     * @deprecated Since version 1.2. Use dismiss instead.
     */
    autoDismiss: boolean;
    constructor(options: Object);
}
