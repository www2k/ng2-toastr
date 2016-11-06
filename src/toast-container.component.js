"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var toast_options_1 = require('./toast-options');
var platform_browser_1 = require('@angular/platform-browser');
var ToastContainer = (function () {
    function ToastContainer(sanitizer, cdr, options) {
        this.sanitizer = sanitizer;
        this.cdr = cdr;
        this.position = 'fixed';
        this.messageClass = 'toast-message';
        this.titleClass = 'toast-title';
        this.positionClass = 'toast-top-right';
        this.toasts = [];
        this.maxShown = 5;
        this.newestOnTop = false;
        this.animate = 'fade';
        if (options) {
            Object.assign(this, options);
        }
    }
    ToastContainer.prototype.addToast = function (toast) {
        if (this.positionClass.indexOf('top') > 0) {
            if (this.newestOnTop) {
                this.toasts.unshift(toast);
            }
            else {
                this.toasts.push(toast);
            }
            if (this.toasts.length > this.maxShown) {
                var diff = this.toasts.length - this.maxShown;
                if (this.newestOnTop) {
                    this.toasts.splice(this.maxShown);
                }
                else {
                    this.toasts.splice(0, diff);
                }
            }
        }
        else {
            this.toasts.unshift(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(this.maxShown);
            }
        }
        this.cdr.detectChanges();
    };
    ToastContainer.prototype.removeToast = function (toast) {
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
            toast.timeoutId = null;
        }
        this.toasts = this.toasts.filter(function (t) {
            return t.id !== toast.id;
        });
    };
    ToastContainer.prototype.removeAllToasts = function () {
        this.toasts = [];
    };
    ToastContainer.prototype.clicked = function (toast) {
        if (this.onToastClicked) {
            this.onToastClicked(toast);
        }
    };
    ToastContainer.prototype.anyToast = function () {
        return this.toasts.length > 0;
    };
    ToastContainer.prototype.findToast = function (toastId) {
        for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
            var toast = _a[_i];
            if (toast.id === toastId) {
                return toast;
            }
        }
        return null;
    };
    ToastContainer = __decorate([
        core_1.Component({
            selector: 'toast-container',
            template: "\n    <div #toastContainer id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" [@inOut]=\"animate\" class=\"toast toast-{{toast.type}}\" \n      (click)=\"clicked(toast)\">\n        <div class=\"toast-close-button\" *ngIf=\"toast.config.showCloseButton\" (click)=\"removeToast(toast)\">&times;\n        </div> \n        <div *ngIf=\"toast.title\" class=\"{{toast.config.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.config.enableHTML\">\n          <span *ngSwitchCase=\"true\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.config.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>             \n      </div>\n    </div>\n    ",
            animations: [
                core_1.trigger('inOut', [
                    core_1.state('flyRight, flyLeft', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.state('fade', core_1.style({ opacity: 1 })),
                    core_1.state('slideDown, slideUp', core_1.style({ opacity: 1, transform: 'translateY(0)' })),
                    core_1.transition('void => flyRight', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ]),
                    core_1.transition('flyRight => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ]),
                    core_1.transition('void => flyLeft', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ]),
                    core_1.transition('flyLeft => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }))
                    ]),
                    core_1.transition('void => fade', [
                        core_1.style({
                            opacity: 0,
                        }),
                        core_1.animate('0.3s ease-in')
                    ]),
                    core_1.transition('fade => void', [
                        core_1.animate('0.3s 10 ease-out', core_1.style({
                            opacity: 0,
                        }))
                    ]),
                    core_1.transition('void => slideDown', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateY(-200%)'
                        }),
                        core_1.animate('0.3s ease-in')
                    ]),
                    core_1.transition('slideDown => void', [
                        core_1.animate('0.3s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateY(-200%)'
                        }))
                    ]),
                    core_1.transition('void => slideUp', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateY(200%)'
                        }),
                        core_1.animate('0.3s ease-in')
                    ]),
                    core_1.transition('slideUp => void', [
                        core_1.animate('0.3s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateY(200%)'
                        }))
                    ]),
                ]),
            ],
        }),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef, toast_options_1.ToastOptions])
    ], ToastContainer);
    return ToastContainer;
}());
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.component.js.map