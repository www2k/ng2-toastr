import {
  Injectable, ComponentRef, ApplicationRef,
  Optional, ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import {ToastContainer} from './toast-container.component';
import {ToastOptions} from './toast-options';
import {Toast} from './toast';
import {Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class ToastsManager {
  container: ComponentRef<any>;

  private options: any = {};
  private index = 0;
  private toastClicked: Subject<Toast> = new Subject<Toast>();
  private _rootViewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              @Optional() options: ToastOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  setRootViewContainerRef(vRef: ViewContainerRef) {
    this._rootViewContainerRef = vRef;
  }

  onClickToast(): Observable<Toast> {
    return this.toastClicked.asObservable();
  }

  show(toast: Toast, options?: Object): Promise<Toast> {
    return new Promise((resolve, reject) => {
      if (!this.container) {
        if (!this.appRef['_rootComponents'].length) {
          const err = new Error('Application root component cannot be found. Try accessing application reference in the later life cycle of angular app.');
          console.error(err);
          reject(err);
        }

        // get app root view component ref
        if (!this._rootViewContainerRef) {
          this._rootViewContainerRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
        }

        // get options providers
        let providers = ReflectiveInjector.resolve([
          {provide: ToastOptions, useValue: <ToastOptions>this.options }
        ]);

        // create and load ToastContainer
        let toastFactory = this.componentFactoryResolver.resolveComponentFactory(ToastContainer);
        let childInjector = ReflectiveInjector.fromResolvedProviders(providers, this._rootViewContainerRef.parentInjector);
        this.container = this._rootViewContainerRef.createComponent(toastFactory, this._rootViewContainerRef.length, childInjector);
        this.container.instance.onToastClicked = (toast: Toast) => {
          this._onToastClicked(toast);
        }
      }

      resolve(this.setupToast(toast, options));
    });
  }

  createTimeout(toast: Toast): any {
    const task = setTimeout(() => {
      this.clearToast(toast);
    }, toast.config.toastLife);

    return task.toString();
  }

  setupToast(toast: Toast, options?: Object): Toast {
    toast.id = ++this.index;

    Object.keys(toast.config).forEach(k => {
      if (this.options.hasOwnProperty(k)) {
        toast.config[k] = this.options[k];
      }

      if (options && options.hasOwnProperty(k)) {
        toast.config[k] = options[k];
      }
    });

    if (toast.config.dismiss === 'auto') {
      toast.timeoutId = this.createTimeout(toast);
    }

    this.container.instance.addToast(toast);
    return toast;
  }

  private _onToastClicked(toast: Toast) {
    this.toastClicked.next(toast);
    if (toast.config.dismiss === 'click') {
      this.clearToast(toast);
    }
  }

  dismissToast(toast: Toast) {
    this.clearToast(toast);
  }

  clearToast(toast: Toast) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toast);
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  clearAllToasts() {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeAllToasts();
      this.dispose();
    }
  }

  dispose() {
    // using timeout to allow animation to finish
    setTimeout(() => {
      if (this.container && !this.container.instance.anyToast()) {
        this.container.destroy();
        this.container = null;
      }
    }, 2000);
  }

  error(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('error', message, title, data);
    return this.show(toast, options);
  }

  info(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('info', message, title, data);
    return this.show(toast, options);
  }

  success(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('success', message, title, data);
    return this.show(toast, options);
  }

  warning(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('warning', message, title, data);
    return this.show(toast, options);
  }

  // allow user define custom background color and image
  custom(message: string, title?: string, options?: any): Promise<Toast> {
    const data = options && options.data ? options.data : null;
    const toast = new Toast('custom', message, title, data);
    return this.show(toast, options);
  }
}
