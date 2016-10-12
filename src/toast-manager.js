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
var toast_container_component_1 = require('./toast-container.component');
var toast_options_1 = require('./toast-options');
var toast_1 = require('./toast');
var ToastsManager = (function () {
    function ToastsManager(componentFactoryResolver, appRef, options) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.options = {
            dismiss: 'auto',
            toastLife: 3000,
        };
        this.index = 0;
        if (options) {
            Object.assign(this.options, options);
        }
    }
    ToastsManager.prototype.show = function (toast, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.container) {
                if (!_this.appRef['_rootComponents'].length) {
                    var err = new Error('Application root component cannot be found. Try accessing application reference in the later life cycle of angular app.');
                    console.error(err);
                    reject(err);
                }
                // get app root view component ref
                var appContainer = _this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
                // get options providers
                var providers = core_1.ReflectiveInjector.resolve([
                    { provide: toast_options_1.ToastOptions, useValue: _this.options }
                ]);
                // create and load ToastContainer
                var toastFactory = _this.componentFactoryResolver.resolveComponentFactory(toast_container_component_1.ToastContainer);
                var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
                _this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
                _this.container.instance.onToastClicked = function (toast) {
                    _this.onToastClicked(toast);
                };
            }
            resolve(_this.setupToast(toast, options));
        });
    };
    ToastsManager.prototype.createTimeout = function (toastId, timeout) {
        var _this = this;
        var life = timeout || this.options.toastLife;
        setTimeout(function () {
            _this.clearToast(toastId);
        }, life);
    };
    ToastsManager.prototype.setupToast = function (toast, options) {
        toast.id = ++this.index;
        if (options && typeof (options.messageClass) === 'string') {
            toast.messageClass = options.messageClass;
        }
        if (options && typeof (options.titleClass) === 'string') {
            toast.titleClass = options.titleClass;
        }
        if (options && typeof (options.enableHTML) === 'boolean') {
            toast.enableHTML = options.enableHTML;
        }
        if (options && typeof (options.dismiss) === 'string') {
            toast.dismiss = options.dismiss;
        }
        else if (options && typeof (options.autoDismiss) === 'boolean') {
            // backward compatibility
            toast.dismiss = options.autoDismiss ? 'auto' : 'click';
        }
        else {
            toast.dismiss = this.options.dismiss;
        }
        if (options && typeof (options.toastLife) === 'number') {
            toast.dismiss = 'auto';
            this.createTimeout(toast.id, options.toastLife);
        }
        else if (toast.dismiss === 'auto') {
            this.createTimeout(toast.id);
        }
        this.container.instance.addToast(toast);
        return toast;
    };
    ToastsManager.prototype.onToastClicked = function (toast) {
        if (toast.dismiss === 'click') {
            this.clearToast(toast.id);
        }
    };
    ToastsManager.prototype.dismissToast = function (toast) {
        this.clearToast(toast.id);
    };
    ToastsManager.prototype.clearToast = function (toastId) {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeToast(toastId);
            if (!instance.anyToast()) {
                this.dispose();
            }
        }
    };
    ToastsManager.prototype.clearAllToasts = function () {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeAllToasts();
            this.dispose();
        }
    };
    ToastsManager.prototype.dispose = function () {
        var _this = this;
        // using timeout to allow animation to finish
        setTimeout(function () {
            if (_this.container && !_this.container.instance.anyToast()) {
                _this.container.destroy();
                _this.container = null;
            }
        }, 2000);
    };
    ToastsManager.prototype.error = function (message, title, options) {
        var toast = new toast_1.Toast('error', message, title);
        return this.show(toast, options);
    };
    ToastsManager.prototype.info = function (message, title, options) {
        var toast = new toast_1.Toast('info', message, title);
        return this.show(toast, options);
    };
    ToastsManager.prototype.success = function (message, title, options) {
        var toast = new toast_1.Toast('success', message, title);
        return this.show(toast, options);
    };
    ToastsManager.prototype.warning = function (message, title, options) {
        var toast = new toast_1.Toast('warning', message, title);
        return this.show(toast, options);
    };
    // allow user define custom background color and image
    ToastsManager.prototype.custom = function (message, title, options) {
        var toast = new toast_1.Toast('custom', message, title);
        return this.show(toast, options);
    };
    ToastsManager = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef, toast_options_1.ToastOptions])
    ], ToastsManager);
    return ToastsManager;
}());
exports.ToastsManager = ToastsManager;
//# sourceMappingURL=toast-manager.js.map