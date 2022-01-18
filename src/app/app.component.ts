import { Todo } from './../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todo: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;


  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      title:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required

      ])]
    });

    this.load();

  }
      add(){
        const title = this.form.controls['title'].value;
        const id = this.todo.length +1;
        this.todo.push(new Todo(id, title, false));
        this.save();
        this.clear();
      }
      clear(){
        this.form.reset();
      }

  remove(todo:Todo){
    const index= this.todo.indexOf(todo);
    if (index !== -1){
      this.todo.splice(index, 1);
    }
  }
  markAsDone(todo:Todo){
      todo.done = true;
  }
  markAsUndone(todo:Todo){
      todo.done = false;
  }
  save(){
    const data = JSON.stringify(this.todo);
    localStorage.setItem('todo',data);
    this.mode='list';
  }
  load(){
    const data = localStorage.getItem('todo');
    if(data){
      this.todo = JSON.parse(data);
    }else{
      this.todo = [];
    }

  }
  changeMode(mode: string){
    this.mode = mode;
  }
}
