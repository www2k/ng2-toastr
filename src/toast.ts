export class Toast {
  id: number;
  autoDismiss: boolean = true;

  constructor(public type: string,
              public message: string,
              public title?: string) {

  }
}

