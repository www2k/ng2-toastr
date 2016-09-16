export class Toast {
  id: number;
  autoDismiss: boolean = true;
  enableHTML: boolean = false;
  titleClass: string;
  messageClass: string;
  state: string;

  constructor(public type: string,
              public message: string,
              public title?: string) {

  }
}

