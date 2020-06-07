import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  apiEndpoint = environment.apiEndpoint;
  url = `https://crudcrud.com/api/${this.apiEndpoint}/task`;

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(task: Task): Observable<any> {
    const id = task._id;
    delete task._id;

    return this.http.put(this.url + `/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }
}
