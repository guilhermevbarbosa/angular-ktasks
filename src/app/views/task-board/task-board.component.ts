import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Category } from 'src/app/models/category';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  categories: Array<Category>;
  tasks: Array<Task>;

  insert = false;
  selectedTask: Task;

  todo: Array<Task>;
  doing: Array<Task>;
  done: Array<Task>;

  errInForm = false;

  constructor(private taskService: TaskService, private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.list();
    this.listCategories();
  }

  // Listagem
  list() {
    this.taskService.listTasks().subscribe(
      allTasks => {

        this.todo = allTasks.filter((todoTasks) => {
          return todoTasks.status === 0;
        });

        this.doing = allTasks.filter((doingTasks) => {
          return doingTasks.status === 1;
        });

        this.done = allTasks.filter((doneTasks) => {
          return doneTasks.status === 2;
        });

      });
  }

  listCategories() {
    this.categoryService.listCategories().subscribe(
      allCategories => {
        this.categories = allCategories;
      });
  }
  // Listagem

  delete(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      alert('Excluido com sucesso');
      this.list();
    });
  }

  save() {
    this.validateForm();

    if (!this.errInForm) {
      if (this.insert) {
        this.selectedTask.status = 0;

        this.taskService.addTask(this.selectedTask).subscribe(() => {
          alert('Inserido com sucesso');
          this.cleanSelectedTask();
          this.list();
        });
      } else {
        this.taskService.updateTask(this.selectedTask).subscribe(() => {
          alert('Atualizado com sucesso');
          this.cleanSelectedTask();
          this.list();
        });
      }
    }

  }

  formView() {
    document.getElementById('formCard').classList.remove('card-none');
    this.newTask();
  }

  selectTask(task: Task) {
    this.insert = false;
    this.selectedTask = task;
    document.getElementById('formCard').classList.remove('card-none');
  }

  cleanSelectedTask() {
    this.selectedTask = null;
    document.getElementById('formCard').classList.add('card-none');
  }

  newTask() {
    this.insert = true;
    this.selectedTask = new Task();
  }

  // BOARDS
  drop(event: CdkDragDrop<string[]>) {
    const element = event.item.element.nativeElement;
    const actualList = event.container.element.nativeElement.id;

    const elementId = element.id;
    let elementNewStatus: number;

    if (event.previousContainer === event.container) {
      // Quando a tarefa é movida no mesmo Container, só muda a posição dele
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // Quando a tarefa é movida de Container, faz a ação direcionada ao DB
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Altera o valor de actualList de acordo com o quadro em que a tarefa é solta
      if (actualList === 'todo') {
        elementNewStatus = 0;
      } else if (actualList === 'doing') {
        elementNewStatus = 1;
      } else {
        elementNewStatus = 2;
      }

      // Faz a pesquisa e pega a tarefa pelo id
      this.taskService.getOneTask(elementId).subscribe(task => {
        task.status = elementNewStatus;

        // Passa a tarefa para o update e altera o status
        this.taskService.updateTask(task).subscribe(() => {
          alert('Alterado o status com sucesso!');
        });
      });

    }
  }
  // BOARDS

  openSnackBar(message: string, btnOk: string) {
    this.snackBar.open(message, btnOk, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  validateForm() {
    if (this.selectedTask.name === undefined || this.selectedTask.name === '') {
      this.openSnackBar('Nome inválido, o mínimo é 1 caractere', 'Ok');
      this.errInForm = true;
    } else if (this.selectedTask.description === undefined || this.selectedTask.description === '') {
      this.openSnackBar('Descrição inválida, o mínimo é 1 caractere', 'Ok');
      this.errInForm = true;
    } else if (this.selectedTask.category === undefined || this.selectedTask.category === null) {
      this.openSnackBar('Categoria não selecionada, selecione para continuar', 'Ok');
      this.errInForm = true;
    } else {
      this.errInForm = false;
    }
  }

}
