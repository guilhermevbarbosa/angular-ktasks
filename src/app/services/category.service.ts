import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  apiEndpoint = environment.apiEndpoint;
  url = `https://crudcrud.com/api/${this.apiEndpoint}/category`;

  // Listagem de categorias existentes; Retorno do tipo array de categorias.
  listCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  // Adiciona categorias novas; Retorno do tipo categoria.
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  // Edita categorias.
  updateCategory(category: Category): Observable<any> {
    const id = category._id;
    delete category._id;

    return this.http.put(this.url + `/${id}`, category);
  }

  // Deleta categorias.
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }
}
