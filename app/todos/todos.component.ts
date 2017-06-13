import { Component, OnInit } from "@angular/core";

import { Todo } from "../shared/todo";
import { TodoService } from "../shared/todo.service";

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
  styleUrls: ['todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];


  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  create(title: string) {
    this.todoService.createTodo(title).subscribe(todo => this.todos.push(todo));
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(res => {
      let index = this.todos.indexOf(todo);

      if(index > -1) {
        this.todos.splice(index, 1);
      }
    });
  }

  toggle(todo: Todo) {
    this.todoService.toggleTodo(todo).subscribe(res => {
      todo.completed = !todo.completed;
    });
  }

}