import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  formView() {
    document.getElementById('formCard').classList.remove('card-none');
    this.newTask();
  }

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

  remove(id: string) {
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

  selectTask(task: Task) {
    this.insert = false;
    this.selectedTask = task;
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

    const prevList = event.previousContainer.element.nativeElement.id;
    const actualList = event.container.element.nativeElement.id;

    const elementId = element.id;
    let elementNewStatus: number;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (actualList === 'todo') {
        elementNewStatus = 0;
      } else if (actualList === 'doing') {
        elementNewStatus = 1;
      } else {
        elementNewStatus = 2;
      }

      this.taskService.getOneTask(elementId).subscribe(task => {
        task.status = elementNewStatus;

        this.taskService.updateTask(task).subscribe(() => {
          alert('Alterado o status com sucesso!');
        });
      });

    }
  }
  // BOARDS

}
