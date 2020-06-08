import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Category } from 'src/app/models/category';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  categories: Array<Category>;
  tasks: Array<Task>;

  insert = false;
  selectedTask: Task;

  todo: Array<Task>;
  doing: Array<Task>;
  done: Array<Task>;

  constructor(private taskService: TaskService, private categoryService: CategoryService) { }

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

}
