import {
  Injectable, ComponentRef, ApplicationRef,
  Inject, Optional, ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver, Injector
} from '@angular/core';
import {ToastContainer} from './toast-container.component';
import {ToastOptions} from './toast-options';
import {Toast} from './toast';

@Injectable()
export class ToastsManager {
  container: ComponentRef<any>;
  private options = {
    autoDismiss: true,
    toastLife: 3000,
  };
  private index = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              @Optional() @Inject(ToastOptions) options) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  show(toast: Toast) {
    if (!this.container) {
      // get app root view component ref
      const rootComponent = this.appRef.componentTypes[0];
      let appContainer: ViewContainerRef = this.injector.get(rootComponent).viewContainerRef;
      console.log('container: ', appContainer);
      // get options providers
      let providers = ReflectiveInjector.resolve([
        {provide: ToastOptions, useValue: <ToastOptions>this.options }
      ]);

      // create and load ToastContainer
      let toastFactory = this.componentFactoryResolver.resolveComponentFactory(ToastContainer);
      let childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
      this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
      this.setupToast(toast);

    } else {
      this.setupToast(toast);
    }
  }

  createTimeout(toastId: number) {
    setTimeout(() => {
      this.clearToast(toastId);
    }, this.options.toastLife);
  }

  setupToast(toast: Toast) {
    toast.id = ++this.index;
    this.container.instance.addToast(toast);
    if (this.options.autoDismiss) {
      this.createTimeout(toast.id);
    }
  }

  clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toastId);
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  dispose() {
    this.container.destroy();
    this.container = null;
  }

  error(message: string, title?: string) {
    let toast = new Toast('error', message, title);
    this.show(toast);
  }

  info(message: string, title?: string) {
    let toast = new Toast('info', message, title);
    this.show(toast);
  }

  success(message: string, title?: string) {
    let toast = new Toast('success', message, title);
    this.show(toast);
  }

  warning(message: string, title?: string) {
    let toast = new Toast('warning', message, title);
    this.show(toast);
  }
}
