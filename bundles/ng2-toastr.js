System.registerDynamic("ng2-toastr/src/toast.module", ["@angular/core", "@angular/common", "./toast-container.component", "./toast-manager"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var toast_container_component_1 = $__require('./toast-container.component');
  var toast_manager_1 = $__require('./toast-manager');
  var ToastModule = (function() {
    function ToastModule() {}
    ToastModule.decorators = [{
      type: core_1.NgModule,
      args: [{
        imports: [common_1.CommonModule],
        declarations: [toast_container_component_1.ToastContainer],
        exports: [toast_container_component_1.ToastContainer],
        providers: [toast_manager_1.ToastsManager],
        entryComponents: [toast_container_component_1.ToastContainer]
      }]
    }];
    ToastModule.ctorParameters = [];
    return ToastModule;
  }());
  exports.ToastModule = ToastModule;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Toast = (function() {
    function Toast(type, message, title) {
      this.type = type;
      this.message = message;
      this.title = title;
      this.autoDismiss = true;
      this.enableHTML = false;
    }
    return Toast;
  }());
  exports.Toast = Toast;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast-manager", ["@angular/core", "./toast-container.component", "./toast-options", "./toast"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core_1 = $__require('@angular/core');
  var toast_container_component_1 = $__require('./toast-container.component');
  var toast_options_1 = $__require('./toast-options');
  var toast_1 = $__require('./toast');
  var ToastsManager = (function() {
    function ToastsManager(componentFactoryResolver, appRef, options) {
      this.componentFactoryResolver = componentFactoryResolver;
      this.appRef = appRef;
      this.options = {
        autoDismiss: true,
        toastLife: 3000
      };
      this.index = 0;
      if (options) {
        Object.assign(this.options, options);
      }
    }
    ToastsManager.prototype.show = function(toast, options) {
      if (!this.container) {
        var appContainer = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
        var providers = core_1.ReflectiveInjector.resolve([{
          provide: toast_options_1.ToastOptions,
          useValue: this.options
        }]);
        var toastFactory = this.componentFactoryResolver.resolveComponentFactory(toast_container_component_1.ToastContainer);
        var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
        this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
        this.setupToast(toast, options);
      } else {
        this.setupToast(toast, options);
      }
    };
    ToastsManager.prototype.createTimeout = function(toastId, timeout) {
      var _this = this;
      var life = timeout || this.options.toastLife;
      setTimeout(function() {
        _this.clearToast(toastId);
      }, life);
    };
    ToastsManager.prototype.setupToast = function(toast, options) {
      toast.id = ++this.index;
      if (options && typeof(options.messageClass) === 'string') {
        toast.messageClass = options.messageClass;
      }
      if (options && typeof(options.titleClass) === 'string') {
        toast.titleClass = options.titleClass;
      }
      if (options && typeof(options.enableHTML) === 'boolean') {
        toast.enableHTML = options.enableHTML;
      }
      if (options && typeof(options.autoDismiss) === 'boolean') {
        toast.autoDismiss = options.autoDismiss;
      } else {
        toast.autoDismiss = this.options.autoDismiss;
      }
      if (options && typeof(options.toastLife) === 'number') {
        toast.autoDismiss = true;
        this.createTimeout(toast.id, options.toastLife);
      } else if (toast.autoDismiss) {
        this.createTimeout(toast.id);
      }
      this.container.instance.addToast(toast);
    };
    ToastsManager.prototype.clearToast = function(toastId) {
      if (this.container) {
        var instance = this.container.instance;
        instance.removeToast(toastId);
        if (!instance.anyToast()) {
          this.dispose();
        }
      }
    };
    ToastsManager.prototype.clearAllToasts = function() {
      if (this.container) {
        var instance = this.container.instance;
        instance.removeAllToasts();
        if (!instance.anyToast()) {
          this.dispose();
        }
      }
    };
    ToastsManager.prototype.dispose = function() {
      this.container.destroy();
      this.container = null;
    };
    ToastsManager.prototype.error = function(message, title, options) {
      var toast = new toast_1.Toast('error', message, title);
      this.show(toast, options);
    };
    ToastsManager.prototype.info = function(message, title, options) {
      var toast = new toast_1.Toast('info', message, title);
      this.show(toast, options);
    };
    ToastsManager.prototype.success = function(message, title, options) {
      var toast = new toast_1.Toast('success', message, title);
      this.show(toast, options);
    };
    ToastsManager.prototype.warning = function(message, title, options) {
      var toast = new toast_1.Toast('warning', message, title);
      this.show(toast, options);
    };
    ToastsManager.prototype.custom = function(message, title, options) {
      var toast = new toast_1.Toast('custom', message, title);
      this.show(toast, options);
    };
    ToastsManager.decorators = [{type: core_1.Injectable}];
    ToastsManager.ctorParameters = [{type: core_1.ComponentFactoryResolver}, {type: core_1.ApplicationRef}, {
      type: toast_options_1.ToastOptions,
      decorators: [{type: core_1.Optional}]
    }];
    return ToastsManager;
  }());
  exports.ToastsManager = ToastsManager;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast-container.component", ["@angular/core", "./toast-options", "@angular/platform-browser"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core_1 = $__require('@angular/core');
  var toast_options_1 = $__require('./toast-options');
  var platform_browser_1 = $__require('@angular/platform-browser');
  var ToastContainer = (function() {
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
    ToastContainer.prototype.addToast = function(toast) {
      if (this.positionClass.indexOf('top') > 0) {
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
          this.toasts.splice(0, (this.toasts.length - this.maxShown));
        }
      } else {
        this.toasts.unshift(toast);
        if (this.toasts.length > this.maxShown) {
          this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
        }
      }
    };
    ToastContainer.prototype.removeToast = function(toastId) {
      this.toasts = this.toasts.filter(function(toast) {
        return toast.id !== toastId;
      });
    };
    ToastContainer.prototype.removeAllToasts = function() {
      this.toasts = [];
    };
    ToastContainer.prototype.dismiss = function(toast) {
      if (!toast.autoDismiss) {
        this.removeToast(toast.id);
      }
    };
    ToastContainer.prototype.anyToast = function() {
      return this.toasts.length > 0;
    };
    ToastContainer.prototype.findToast = function(toastId) {
      for (var _i = 0,
          _a = this.toasts; _i < _a.length; _i++) {
        var toast = _a[_i];
        if (toast.id === toastId) {
          return toast;
        }
      }
      return null;
    };
    ToastContainer.decorators = [{
      type: core_1.Component,
      args: [{
        selector: 'toast-container',
        template: "\n    <div id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" class=\"toast-{{toast.type}}\" (click)=\"dismiss(toast)\">\n        <div *ngIf=\"toast.title\" class=\"{{toast.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.enableHTML\">\n          <span *ngSwitchCase=\"true\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>              \n      </div>\n    </div>\n    "
      }]
    }];
    ToastContainer.ctorParameters = [{type: platform_browser_1.DomSanitizer}, {
      type: toast_options_1.ToastOptions,
      decorators: [{type: core_1.Optional}]
    }];
    return ToastContainer;
  }());
  exports.ToastContainer = ToastContainer;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast-container.component.ngfactory", ["@angular/core/src/linker/view", "@angular/core/src/linker/element", "./toast-container.component", "@angular/core/src/linker/view_utils", "@angular/core/src/linker/view_type", "@angular/core/src/change_detection/change_detection", "@angular/platform-browser/src/security/dom_sanitization_service", "./toast-options", "@angular/core/src/metadata/view", "@angular/core/src/linker/component_factory", "@angular/common/src/directives/ng_for", "@angular/core/src/linker/template_ref", "@angular/core/src/change_detection/differs/iterable_differs", "@angular/core/src/security", "@angular/common/src/directives/ng_if", "@angular/common/src/directives/ng_switch"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var import1 = $__require('@angular/core/src/linker/view');
  var import2 = $__require('@angular/core/src/linker/element');
  var import3 = $__require('./toast-container.component');
  var import4 = $__require('@angular/core/src/linker/view_utils');
  var import6 = $__require('@angular/core/src/linker/view_type');
  var import7 = $__require('@angular/core/src/change_detection/change_detection');
  var import8 = $__require('@angular/platform-browser/src/security/dom_sanitization_service');
  var import9 = $__require('./toast-options');
  var import10 = $__require('@angular/core/src/metadata/view');
  var import11 = $__require('@angular/core/src/linker/component_factory');
  var import12 = $__require('@angular/common/src/directives/ng_for');
  var import13 = $__require('@angular/core/src/linker/template_ref');
  var import14 = $__require('@angular/core/src/change_detection/differs/iterable_differs');
  var import15 = $__require('@angular/core/src/security');
  var import16 = $__require('@angular/common/src/directives/ng_if');
  var import17 = $__require('@angular/common/src/directives/ng_switch');
  var renderType_ToastContainer_Host = null;
  var _View_ToastContainer_Host0 = (function(_super) {
    __extends(_View_ToastContainer_Host0, _super);
    function _View_ToastContainer_Host0(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer_Host0, renderType_ToastContainer_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer_Host0.prototype.createInternal = function(rootSelector) {
      this._el_0 = this.selectOrCreateHostElement('toast-container', rootSelector, null);
      this._appEl_0 = new import2.AppElement(0, null, this, this._el_0);
      var compView_0 = viewFactory_ToastContainer0(this.viewUtils, this.injector(0), this._appEl_0);
      this._ToastContainer_0_4 = new import3.ToastContainer(this.parentInjector.get(import8.DomSanitizer), this.parentInjector.get(import9.ToastOptions, null));
      this._appEl_0.initComponent(this._ToastContainer_0_4, [], compView_0);
      compView_0.create(this._ToastContainer_0_4, this.projectableNodes, null);
      this.init([].concat([this._el_0]), [this._el_0], [], []);
      return this._appEl_0;
    };
    _View_ToastContainer_Host0.prototype.injectorGetInternal = function(token, requestNodeIndex, notFoundResult) {
      if (((token === import3.ToastContainer) && (0 === requestNodeIndex))) {
        return this._ToastContainer_0_4;
      }
      return notFoundResult;
    };
    return _View_ToastContainer_Host0;
  }(import1.AppView));
  function viewFactory_ToastContainer_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_ToastContainer_Host === null)) {
      (renderType_ToastContainer_Host = viewUtils.createRenderComponentType('', 0, import10.ViewEncapsulation.None, [], {}));
    }
    return new _View_ToastContainer_Host0(viewUtils, parentInjector, declarationEl);
  }
  exports.ToastContainerNgFactory = new import11.ComponentFactory('toast-container', viewFactory_ToastContainer_Host0, import3.ToastContainer);
  var styles_ToastContainer = [];
  var renderType_ToastContainer = null;
  var _View_ToastContainer0 = (function(_super) {
    __extends(_View_ToastContainer0, _super);
    function _View_ToastContainer0(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer0, renderType_ToastContainer, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer0.prototype.createInternal = function(rootSelector) {
      var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
      this._text_0 = this.renderer.createText(parentRenderNode, '\n    ', null);
      this._el_1 = this.renderer.createElement(parentRenderNode, 'div', null);
      this.renderer.setElementAttribute(this._el_1, 'id', 'toast-container');
      this._text_2 = this.renderer.createText(this._el_1, '\n      ', null);
      this._anchor_3 = this.renderer.createTemplateAnchor(this._el_1, null);
      this._appEl_3 = new import2.AppElement(3, 1, this, this._anchor_3);
      this._TemplateRef_3_5 = new import13.TemplateRef_(this._appEl_3, viewFactory_ToastContainer1);
      this._NgFor_3_6 = new import12.NgFor(this._appEl_3.vcRef, this._TemplateRef_3_5, this.parentInjector.get(import14.IterableDiffers), this.ref);
      this._text_4 = this.renderer.createText(this._el_1, '\n    ', null);
      this._text_5 = this.renderer.createText(parentRenderNode, '\n    ', null);
      this._expr_0 = import7.UNINITIALIZED;
      this._expr_1 = import7.UNINITIALIZED;
      this._expr_2 = import7.UNINITIALIZED;
      this.init([], [this._text_0, this._el_1, this._text_2, this._anchor_3, this._text_4, this._text_5], [], []);
      return null;
    };
    _View_ToastContainer0.prototype.injectorGetInternal = function(token, requestNodeIndex, notFoundResult) {
      if (((token === import13.TemplateRef) && (3 === requestNodeIndex))) {
        return this._TemplateRef_3_5;
      }
      if (((token === import12.NgFor) && (3 === requestNodeIndex))) {
        return this._NgFor_3_6;
      }
      return notFoundResult;
    };
    _View_ToastContainer0.prototype.detectChangesInternal = function(throwOnChange) {
      var changes = null;
      changes = null;
      var currVal_2 = this.context.toasts;
      if (import4.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
        this._NgFor_3_6.ngForOf = currVal_2;
        if ((changes === null)) {
          (changes = {});
        }
        changes['ngForOf'] = new import7.SimpleChange(this._expr_2, currVal_2);
        this._expr_2 = currVal_2;
      }
      if ((changes !== null)) {
        this._NgFor_3_6.ngOnChanges(changes);
      }
      if (!throwOnChange) {
        this._NgFor_3_6.ngDoCheck();
      }
      this.detectContentChildrenChanges(throwOnChange);
      var currVal_0 = this.context.position;
      if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
        this.renderer.setElementStyle(this._el_1, 'position', ((this.viewUtils.sanitizer.sanitize(import15.SecurityContext.STYLE, currVal_0) == null) ? null : this.viewUtils.sanitizer.sanitize(import15.SecurityContext.STYLE, currVal_0).toString()));
        this._expr_0 = currVal_0;
      }
      var currVal_1 = import4.interpolate(1, '', this.context.positionClass, '');
      if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
        this.renderer.setElementProperty(this._el_1, 'className', currVal_1);
        this._expr_1 = currVal_1;
      }
      this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ToastContainer0;
  }(import1.AppView));
  function viewFactory_ToastContainer0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_ToastContainer === null)) {
      (renderType_ToastContainer = viewUtils.createRenderComponentType('/Users/dereks/Documents/PointInside/ng2-toastr/src/toast-container.component.ts class ToastContainer - inline template', 0, import10.ViewEncapsulation.None, styles_ToastContainer, {}));
    }
    return new _View_ToastContainer0(viewUtils, parentInjector, declarationEl);
  }
  exports.viewFactory_ToastContainer0 = viewFactory_ToastContainer0;
  var _View_ToastContainer1 = (function(_super) {
    __extends(_View_ToastContainer1, _super);
    function _View_ToastContainer1(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer1, renderType_ToastContainer, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer1.prototype.createInternal = function(rootSelector) {
      this._el_0 = this.renderer.createElement(null, 'div', null);
      this._text_1 = this.renderer.createText(this._el_0, '\n        ', null);
      this._anchor_2 = this.renderer.createTemplateAnchor(this._el_0, null);
      this._appEl_2 = new import2.AppElement(2, 0, this, this._anchor_2);
      this._TemplateRef_2_5 = new import13.TemplateRef_(this._appEl_2, viewFactory_ToastContainer2);
      this._NgIf_2_6 = new import16.NgIf(this._appEl_2.vcRef, this._TemplateRef_2_5);
      this._text_3 = this.renderer.createText(this._el_0, '\n        ', null);
      this._el_4 = this.renderer.createElement(this._el_0, 'div', null);
      this._NgSwitch_4_3 = new import17.NgSwitch();
      this._text_5 = this.renderer.createText(this._el_4, '\n          ', null);
      this._anchor_6 = this.renderer.createTemplateAnchor(this._el_4, null);
      this._appEl_6 = new import2.AppElement(6, 4, this, this._anchor_6);
      this._TemplateRef_6_5 = new import13.TemplateRef_(this._appEl_6, viewFactory_ToastContainer3);
      this._NgSwitchCase_6_6 = new import17.NgSwitchCase(this._appEl_6.vcRef, this._TemplateRef_6_5, this._NgSwitch_4_3);
      this._text_7 = this.renderer.createText(this._el_4, '\n          ', null);
      this._anchor_8 = this.renderer.createTemplateAnchor(this._el_4, null);
      this._appEl_8 = new import2.AppElement(8, 4, this, this._anchor_8);
      this._TemplateRef_8_5 = new import13.TemplateRef_(this._appEl_8, viewFactory_ToastContainer4);
      this._NgSwitchDefault_8_6 = new import17.NgSwitchDefault(this._appEl_8.vcRef, this._TemplateRef_8_5, this._NgSwitch_4_3);
      this._text_9 = this.renderer.createText(this._el_4, '\n        ', null);
      this._text_10 = this.renderer.createText(this._el_0, '              \n      ', null);
      this._expr_1 = import7.UNINITIALIZED;
      var disposable_0 = this.renderer.listen(this._el_0, 'click', this.eventHandler(this._handle_click_0_0.bind(this)));
      this._expr_2 = import7.UNINITIALIZED;
      this._expr_3 = import7.UNINITIALIZED;
      this._expr_4 = import7.UNINITIALIZED;
      this.init([].concat([this._el_0]), [this._el_0, this._text_1, this._anchor_2, this._text_3, this._el_4, this._text_5, this._anchor_6, this._text_7, this._anchor_8, this._text_9, this._text_10], [disposable_0], []);
      return null;
    };
    _View_ToastContainer1.prototype.injectorGetInternal = function(token, requestNodeIndex, notFoundResult) {
      if (((token === import13.TemplateRef) && (2 === requestNodeIndex))) {
        return this._TemplateRef_2_5;
      }
      if (((token === import16.NgIf) && (2 === requestNodeIndex))) {
        return this._NgIf_2_6;
      }
      if (((token === import13.TemplateRef) && (6 === requestNodeIndex))) {
        return this._TemplateRef_6_5;
      }
      if (((token === import17.NgSwitchCase) && (6 === requestNodeIndex))) {
        return this._NgSwitchCase_6_6;
      }
      if (((token === import13.TemplateRef) && (8 === requestNodeIndex))) {
        return this._TemplateRef_8_5;
      }
      if (((token === import17.NgSwitchDefault) && (8 === requestNodeIndex))) {
        return this._NgSwitchDefault_8_6;
      }
      if (((token === import17.NgSwitch) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 9)))) {
        return this._NgSwitch_4_3;
      }
      return notFoundResult;
    };
    _View_ToastContainer1.prototype.detectChangesInternal = function(throwOnChange) {
      var currVal_2 = this.context.$implicit.title;
      if (import4.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
        this._NgIf_2_6.ngIf = currVal_2;
        this._expr_2 = currVal_2;
      }
      var currVal_3 = this.context.$implicit.enableHTML;
      if (import4.checkBinding(throwOnChange, this._expr_3, currVal_3)) {
        this._NgSwitch_4_3.ngSwitch = currVal_3;
        this._expr_3 = currVal_3;
      }
      var currVal_4 = true;
      if (import4.checkBinding(throwOnChange, this._expr_4, currVal_4)) {
        this._NgSwitchCase_6_6.ngSwitchCase = currVal_4;
        this._expr_4 = currVal_4;
      }
      this.detectContentChildrenChanges(throwOnChange);
      var currVal_1 = import4.interpolate(1, 'toast-', this.context.$implicit.type, '');
      if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
        this.renderer.setElementProperty(this._el_0, 'className', currVal_1);
        this._expr_1 = currVal_1;
      }
      this.detectViewChildrenChanges(throwOnChange);
    };
    _View_ToastContainer1.prototype._handle_click_0_0 = function($event) {
      this.markPathToRootAsCheckOnce();
      var pd_0 = (this.parent.context.dismiss(this.context.$implicit) !== false);
      return (true && pd_0);
    };
    return _View_ToastContainer1;
  }(import1.AppView));
  function viewFactory_ToastContainer1(viewUtils, parentInjector, declarationEl) {
    return new _View_ToastContainer1(viewUtils, parentInjector, declarationEl);
  }
  var _View_ToastContainer2 = (function(_super) {
    __extends(_View_ToastContainer2, _super);
    function _View_ToastContainer2(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer2, renderType_ToastContainer, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer2.prototype.createInternal = function(rootSelector) {
      this._el_0 = this.renderer.createElement(null, 'div', null);
      this._text_1 = this.renderer.createText(this._el_0, '', null);
      this._expr_0 = import7.UNINITIALIZED;
      this._expr_1 = import7.UNINITIALIZED;
      this.init([].concat([this._el_0]), [this._el_0, this._text_1], [], []);
      return null;
    };
    _View_ToastContainer2.prototype.detectChangesInternal = function(throwOnChange) {
      this.detectContentChildrenChanges(throwOnChange);
      var currVal_0 = import4.interpolate(1, '', (this.parent.context.$implicit.titleClass || this.parent.parent.context.titleClass), '');
      if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
        this.renderer.setElementProperty(this._el_0, 'className', currVal_0);
        this._expr_0 = currVal_0;
      }
      var currVal_1 = import4.interpolate(1, '', this.parent.context.$implicit.title, '');
      if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
        this.renderer.setText(this._text_1, currVal_1);
        this._expr_1 = currVal_1;
      }
      this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ToastContainer2;
  }(import1.AppView));
  function viewFactory_ToastContainer2(viewUtils, parentInjector, declarationEl) {
    return new _View_ToastContainer2(viewUtils, parentInjector, declarationEl);
  }
  var _View_ToastContainer3 = (function(_super) {
    __extends(_View_ToastContainer3, _super);
    function _View_ToastContainer3(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer3, renderType_ToastContainer, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer3.prototype.createInternal = function(rootSelector) {
      this._el_0 = this.renderer.createElement(null, 'span', null);
      this._expr_0 = import7.UNINITIALIZED;
      this.init([].concat([this._el_0]), [this._el_0], [], []);
      return null;
    };
    _View_ToastContainer3.prototype.detectChangesInternal = function(throwOnChange) {
      this.detectContentChildrenChanges(throwOnChange);
      var currVal_0 = this.parent.parent.context.sanitizer.bypassSecurityTrustHtml(this.parent.context.$implicit.message);
      if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
        this.renderer.setElementProperty(this._el_0, 'innerHTML', this.viewUtils.sanitizer.sanitize(import15.SecurityContext.HTML, currVal_0));
        this._expr_0 = currVal_0;
      }
      this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ToastContainer3;
  }(import1.AppView));
  function viewFactory_ToastContainer3(viewUtils, parentInjector, declarationEl) {
    return new _View_ToastContainer3(viewUtils, parentInjector, declarationEl);
  }
  var _View_ToastContainer4 = (function(_super) {
    __extends(_View_ToastContainer4, _super);
    function _View_ToastContainer4(viewUtils, parentInjector, declarationEl) {
      _super.call(this, _View_ToastContainer4, renderType_ToastContainer, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_ToastContainer4.prototype.createInternal = function(rootSelector) {
      this._el_0 = this.renderer.createElement(null, 'span', null);
      this._text_1 = this.renderer.createText(this._el_0, '', null);
      this._expr_0 = import7.UNINITIALIZED;
      this._expr_1 = import7.UNINITIALIZED;
      this.init([].concat([this._el_0]), [this._el_0, this._text_1], [], []);
      return null;
    };
    _View_ToastContainer4.prototype.detectChangesInternal = function(throwOnChange) {
      this.detectContentChildrenChanges(throwOnChange);
      var currVal_0 = import4.interpolate(1, '', (this.parent.context.$implicit.messageClass || this.parent.parent.context.messageClass), '');
      if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
        this.renderer.setElementProperty(this._el_0, 'className', currVal_0);
        this._expr_0 = currVal_0;
      }
      var currVal_1 = import4.interpolate(1, '', this.parent.context.$implicit.message, '');
      if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
        this.renderer.setText(this._text_1, currVal_1);
        this._expr_1 = currVal_1;
      }
      this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_ToastContainer4;
  }(import1.AppView));
  function viewFactory_ToastContainer4(viewUtils, parentInjector, declarationEl) {
    return new _View_ToastContainer4(viewUtils, parentInjector, declarationEl);
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast-options", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core_1 = $__require('@angular/core');
  var ToastOptions = (function() {
    function ToastOptions(options) {
      this.enableHTML = false;
      Object.assign(this, options);
    }
    ToastOptions.decorators = [{type: core_1.Injectable}];
    ToastOptions.ctorParameters = [{type: Object}];
    return ToastOptions;
  }());
  exports.ToastOptions = ToastOptions;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/src/toast.module.ngfactory", ["@angular/core/src/linker/ng_module_factory", "./toast.module", "@angular/common/src/common_module", "@angular/common/src/localization", "./toast-manager", "./toast-container.component.ngfactory", "@angular/core/src/application_ref", "./toast-options", "@angular/core/src/i18n/tokens"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var import0 = $__require('@angular/core/src/linker/ng_module_factory');
  var import1 = $__require('./toast.module');
  var import2 = $__require('@angular/common/src/common_module');
  var import3 = $__require('@angular/common/src/localization');
  var import4 = $__require('./toast-manager');
  var import6 = $__require('./toast-container.component.ngfactory');
  var import7 = $__require('@angular/core/src/application_ref');
  var import8 = $__require('./toast-options');
  var import9 = $__require('@angular/core/src/i18n/tokens');
  var ToastModuleInjector = (function(_super) {
    __extends(ToastModuleInjector, _super);
    function ToastModuleInjector(parent) {
      _super.call(this, parent, [import6.ToastContainerNgFactory], []);
    }
    Object.defineProperty(ToastModuleInjector.prototype, "_LOCALE_ID_2", {
      get: function() {
        if ((this.__LOCALE_ID_2 == null)) {
          (this.__LOCALE_ID_2 = null);
        }
        return this.__LOCALE_ID_2;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ToastModuleInjector.prototype, "_NgLocalization_3", {
      get: function() {
        if ((this.__NgLocalization_3 == null)) {
          (this.__NgLocalization_3 = new import3.NgLocaleLocalization(this._LOCALE_ID_2));
        }
        return this.__NgLocalization_3;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ToastModuleInjector.prototype, "_ToastsManager_4", {
      get: function() {
        if ((this.__ToastsManager_4 == null)) {
          (this.__ToastsManager_4 = new import4.ToastsManager(this, this.parent.get(import7.ApplicationRef), this.parent.get(import8.ToastOptions, null)));
        }
        return this.__ToastsManager_4;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ToastModuleInjector.prototype, "_TRANSLATIONS_FORMAT_5", {
      get: function() {
        if ((this.__TRANSLATIONS_FORMAT_5 == null)) {
          (this.__TRANSLATIONS_FORMAT_5 = null);
        }
        return this.__TRANSLATIONS_FORMAT_5;
      },
      enumerable: true,
      configurable: true
    });
    ToastModuleInjector.prototype.createInternal = function() {
      this._CommonModule_0 = new import2.CommonModule();
      this._ToastModule_1 = new import1.ToastModule();
      return this._ToastModule_1;
    };
    ToastModuleInjector.prototype.getInternal = function(token, notFoundResult) {
      if ((token === import2.CommonModule)) {
        return this._CommonModule_0;
      }
      if ((token === import1.ToastModule)) {
        return this._ToastModule_1;
      }
      if ((token === import9.LOCALE_ID)) {
        return this._LOCALE_ID_2;
      }
      if ((token === import3.NgLocalization)) {
        return this._NgLocalization_3;
      }
      if ((token === import4.ToastsManager)) {
        return this._ToastsManager_4;
      }
      if ((token === import9.TRANSLATIONS_FORMAT)) {
        return this._TRANSLATIONS_FORMAT_5;
      }
      return notFoundResult;
    };
    ToastModuleInjector.prototype.destroyInternal = function() {};
    return ToastModuleInjector;
  }(import0.NgModuleInjector));
  exports.ToastModuleNgFactory = new import0.NgModuleFactory(ToastModuleInjector, import1.ToastModule);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("ng2-toastr/ng2-toastr", ["./src/toast", "./src/toast-manager", "./src/toast-container.component", "./src/toast-options", "./src/toast.module", "./src/toast-container.component.ngfactory", "./src/toast.module.ngfactory"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./src/toast'));
  __export($__require('./src/toast-manager'));
  __export($__require('./src/toast-container.component'));
  __export($__require('./src/toast-options'));
  __export($__require('./src/toast.module'));
  __export($__require('./src/toast-container.component.ngfactory'));
  __export($__require('./src/toast.module.ngfactory'));
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=ng2-toastr.js.map