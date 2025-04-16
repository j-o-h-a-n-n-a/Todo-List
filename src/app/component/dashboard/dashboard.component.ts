import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newTodo = '';

  addTodo() {
    if (this.newTodo.trim()) {
      console.log('Neue Aufgabe:', this.newTodo);
      this.newTodo = '';
    }
  }
  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

ngOnInit(): void {
  this.editTaskValue= '';
  this.addTaskValue = '';
  this.taskObj = new Task();
  this.taskArr = [];
  this.getAllTasks();
}
getAllTasks() {
  this.crudService.getAllTask().subscribe(res => {
    this.taskArr = res;

  }, err => {
    alert("Unable to get list of tasks");
  });
}

addTask() {
  if (!this.addTaskValue.trim()) return;

  const newTask: Task = {
    task_name: this.addTaskValue,
    completed: false
  };

  this.crudService.addTask(newTask).subscribe({
    next: () => {
      this.getAllTasks();
      this.addTaskValue = '';
    },
    error: err => alert(JSON.stringify(err))
  });
}


  editTask() {
    if (!this.taskObj.id || this.taskObj.id === 0) {
      alert("Keine gültige ID für Update");
      return;
    }

    console.log('Sende Update:', this.taskObj);

    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      const closeModal = document.getElementById('closeModalBtn') as HTMLElement;
if (closeModal) {
  closeModal.click();
}
      (document.getElementById('editModal') as any).click();
    }, err => {
      alert("Failed to update task");
    });
  }
  

deleteTask(etask : Task) {
  if (!etask.id || etask.id === 0) {
    alert("Keine gültige ID für Löschen");
    return;
  }
  console.log('Bearbeite:', this.taskObj);
  this.crudService.deleteTask(etask).subscribe(res => {
    this.ngOnInit()
  }, err=> {
    alert("Failed to delete task");
  });

  console.log('Lösche:', etask);
}

toggleCompleted(task: Task) {
  this.crudService.editTask(task).subscribe({
    next: () => this.ngOnInit(),
    error: () => alert('Konnte Status nicht speichern')
  });
}

setTask(task: Task) {
  console.log('Setze Task:', task);
  this.taskObj = { ...task };
}
   // id: task.id,
   // task_name: task.task_name,
   // completed: task.completed
  // };
  
  updateTaskName(name: string) {
    if (this.taskObj) {
      this.taskObj.task_name = name;
    }
  }
}



