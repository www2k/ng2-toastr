export class Toast {
  id: number;
  dismiss: 'auto' | 'click' | 'controlled';
  enableHTML: boolean = false;
  titleClass: string;
  messageClass: string;

  constructor(public type: string,
              public message: string,
              public title?: string) {

  }
}

