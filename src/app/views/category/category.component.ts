import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  categories: Array<Category>;
  insert = false;
  selectedCategory: Category;
  columnsToShow = ['name', 'acoes'];

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.list();
  }

  formView() {
    document.getElementById('formCard').classList.remove('card-none');
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
    if (this.selectCategory.name.length > 0 && this.selectedCategory.name !== undefined && this.selectedCategory.name !== '') {
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
    } else {
      this.openSnackBar('Nome inválido, o mínimo é 1 caractere', 'Ok');
    }

  }

  selectCategory(category: Category) {
    this.insert = false;
    this.selectedCategory = category;

    document.getElementById('formCard').classList.remove('card-none');
  }

  cleanSelectedCategory() {
    this.selectedCategory = null;
    document.getElementById('formCard').classList.add('card-none');
  }

  newCategory() {
    this.insert = true;
    this.selectedCategory = new Category();
  }

  openSnackBar(message: string, btnOk: string) {
    this.snackBar.open(message, btnOk, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
