"use strict";
var core_1 = require('@angular/core');
var toast_options_1 = require('./toast-options');
var platform_browser_1 = require('@angular/platform-browser');
var ToastContainer = (function () {
    function ToastContainer(sanitizer, options) {
        this.sanitizer = sanitizer;
        this.position = 'fixed';
        this.messageClass = 'toast-message';
        this.titleClass = 'toast-title';
        this.positionClass = 'toast-top-right';
        this.toasts = [];
        this.maxShown = 5;
        if (options) {
            Object.assign(this, options);
        }
    }
    ToastContainer.prototype.addToast = function (toast) {
        if (this.positionClass.indexOf('top') > 0) {
            this.toasts.push(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }
        }
        else {
            this.toasts.unshift(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
            }
        }
    };
    ToastContainer.prototype.removeToast = function (toastId) {
        this.toasts = this.toasts.filter(function (toast) {
            return toast.id !== toastId;
        });
    };
    ToastContainer.prototype.removeAllToasts = function () {
        this.toasts = [];
    };
    ToastContainer.prototype.dismiss = function (toast) {
        if (!toast.autoDismiss) {
            this.removeToast(toast.id);
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
    ToastContainer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'toast-container',
                    template: "\n    <div id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" class=\"toast toast-{{toast.type}}\" (click)=\"dismiss(toast)\">\n        <div *ngIf=\"toast.title\" class=\"{{toast.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.enableHTML\">\n          <span *ngSwitchCase=\"true\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>              \n      </div>\n    </div>\n    ",
                },] },
    ];
    /** @nocollapse */
    ToastContainer.ctorParameters = [
        { type: platform_browser_1.DomSanitizer, },
        { type: toast_options_1.ToastOptions, decorators: [{ type: core_1.Optional },] },
    ];
    return ToastContainer;
}());
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.component.js.map