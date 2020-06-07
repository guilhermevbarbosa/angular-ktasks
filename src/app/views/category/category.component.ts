import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // Form
  categoryName: string;
  // Form

  categories: Array<Category>;
  insert = false;
  selectedCategory: Category;
  columnsToShow = ['name', 'acoes'];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.list();
  }

  formView() {
    document.getElementById('formCard').classList.toggle('card-none');
    this.newCategory();
  }

  list() {
    this.categoryService.listCategories().subscribe(
      allCategory => {
        this.categories = allCategory;
      });
  }

  remove(id: string) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      alert('Excluido com sucesso');
      this.list();
    });
  }

  save() {
    if (this.insert) {
      this.categoryService.addCategory(this.selectedCategory).subscribe(() => {
        alert('Inserido com sucesso');
        this.cleanSelectedCategory();
        this.list();
      });
    } else {
      this.categoryService.updateCategory(this.selectedCategory).subscribe(() => {
        alert('Atualizado com sucesso');
        this.cleanSelectedCategory();
        this.list();
      });
    }
  }

  selectCategory(category: Category) {
    this.insert = false;
    this.selectedCategory = category;
  }

  cleanSelectedCategory() {
    this.selectedCategory = null;
    document.getElementById('formCard').classList.toggle('card-none');
  }

  newCategory() {
    this.insert = true;
    this.selectedCategory = new Category();
  }
}
