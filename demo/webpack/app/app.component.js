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
var core_1 = require('@angular/core');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var AppComponent = (function () {
    function AppComponent(toastr, containerRef) {
        this.toastr = toastr;
        this.toastr.setRootViewContainerRef(containerRef);
    }
    AppComponent.prototype.showSuccess = function () {
        this.toastr.success('You are awesome!', 'Success!', { toastLife: 3000 });
    };
    AppComponent.prototype.showError = function () {
        this.toastr.error('This is not good!', 'Oops!');
    };
    AppComponent.prototype.showWarning = function () {
        this.toastr.warning('You are being warned.', 'Alert!');
    };
    AppComponent.prototype.showInfo = function () {
        this.toastr.info('Just some information for you.');
    };
    AppComponent.prototype.showClickToDismiss = function () {
        this.toastr.info('Please click to dismiss', 'No auto dismiss', { dismiss: 'click' });
    };
    AppComponent.prototype.showCustomLife = function () {
        this.toastr.warning('The toast will auto dismiss in 8 seconds', null, { toastLife: 8000 });
    };
    AppComponent.prototype.showCustomHTML = function () {
        this.toastr.custom('<span style="color: #bd362f">This message should be in red with blank background. Click to dismiss.</span>', 'Custom Message', { enableHTML: true, dismiss: 'click' });
        this.toastr.info('<span style="color: #bd362f">This should be red, </span><br/><span style="color: #bd362f">and multi-line message.</span>', 'Custom Information Message', { enableHTML: true, toastLife: 5000 });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <h1> Angular 2 Toastr Demo.</h1>\n      <div style=\"border: .2rem solid #f7f7f9; position: relative; margin: 1rem -1rem; padding: 10px;\">\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"showSuccess()\">Success</button>\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"showInfo()\">Information</button>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"showWarning()\">Warning</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"showError()\">Error</button>\n      </div>\n      <div style=\"border: .2rem solid #f7f7f9; position: relative; margin: 1rem -1rem; padding: 10px;\">\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"showClickToDismiss()\">Click to Dismiss</button>\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"showCustomLife()\">8-second Toast</button>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"showCustomHTML()\">Custom HTML Toast</button>\n      </div>\n  "
        }), 
        __metadata('design:paramtypes', [ng2_toastr_1.ToastsManager, core_1.ViewContainerRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map