//import { Component } from '@angular/core';

//@Component({
  //selector: 'app-todo-list',
  //imports: [],
  //templateUrl: './todo-list.component.html',
  //styleUrl: './todo-list.component.css'
//})
//export class TodoListComponent {

//}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Task } from '../../model/task';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent {

  @Input() taskArr: Task[] = [];
  @Input() addTaskValue: string = '';
  @Input() taskObj!: Task;

  @Output() addTaskValueChange = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Task>();
  @Output() set = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<Task>();
  @Output() updateTaskName = new EventEmitter<string>();
  
}



