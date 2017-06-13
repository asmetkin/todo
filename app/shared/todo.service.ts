import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Todo } from "./todo";


@Injectable()
export class TodoService {
  private apiUrl = 'api/todos';

  constructor(private http: Http) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get(this.apiUrl)
                    .map(res => res.json().data)
                    .catch(this.handleError);
  }

  toggleTodo(todo: Todo) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    let url = `${this.apiUrl}/${todo.id}`;

    return this.http.put(url, todo, options)
                    .catch(this.handleError);
  }

  deleteTodo(todo: Todo) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    let url = `${this.apiUrl}/${todo.id}`;

    return this.http.delete(url, options).catch(this.handleError);
  }

  createTodo(title: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options =new RequestOptions({ headers });
    let todo = new Todo(title);

    return this.http.post(this.apiUrl, todo, options)
                    .map(res => res.json().data)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log('Произошла ошибка',error);
    return Observable.throw(error.message || error);
  }
}