export class Todo {
  id: number;
  constructor(public title: string,
              public completed: boolean = false) {}
}