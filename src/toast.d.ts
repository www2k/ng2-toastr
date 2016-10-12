export declare class Toast {
    type: string;
    message: string;
    title: string;
    id: number;
    dismiss: 'auto' | 'click' | 'controlled';
    enableHTML: boolean;
    titleClass: string;
    messageClass: string;
    constructor(type: string, message: string, title?: string);
}
