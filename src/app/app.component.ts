import { Component,Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StudentModel } from './student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit{
 
  fiveBathList = [4,10,8,20,50];
  oneBathList :number[] = [];
  summary = 0;

  editStudent: StudentModel|null = null;

  ngOnInit(): void {
    
  }

  transform5BathToBath(){
    this.oneBathList = this.fiveBathList.map(num=>{
      return num*5 
    })
  }

  sum(){
    this.summary = this.fiveBathList.reduce((sumCost,num)=>{
      return sumCost + num*5
    },0)

  }

}
