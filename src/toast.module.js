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
var common_1 = require('@angular/common');
var toast_container_component_1 = require('./toast-container.component');
var toast_manager_1 = require('./toast-manager');
var toast_options_1 = require('./toast-options');
var ToastModule = (function () {
    function ToastModule() {
    }
    ToastModule.forRoot = function (config) {
        return {
            ngModule: ToastModule,
            providers: [
                { provide: toast_options_1.ToastOptions, useValue: config }
            ]
        };
    };
    ToastModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [toast_container_component_1.ToastContainer],
            exports: [toast_container_component_1.ToastContainer],
            providers: [toast_manager_1.ToastsManager],
            entryComponents: [toast_container_component_1.ToastContainer]
        }), 
        __metadata('design:paramtypes', [])
    ], ToastModule);
    return ToastModule;
}());
exports.ToastModule = ToastModule;
//# sourceMappingURL=toast.module.js.map