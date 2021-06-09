import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  
})
export class AddStudentComponent implements OnInit {

  nameFormControl =  new FormControl(null,Validators.required);
  emailFormControl = new FormControl(null,[Validators.required, Validators.email]);
  telFormControl = new FormControl(null,Validators.required);

  addStudentFormGroup = new FormGroup({
    email: this.emailFormControl,
    name: this.nameFormControl,
    tel: this.telFormControl
  });


  constructor(private http : HttpClient,
    private messageService: MessageService,
    private router:Router
    ){ 

    }

  ngOnInit(): void {
  }

  saveStudent(){
    const student = this.addStudentFormGroup.value;
  
    this.http.post('/training-demo/student',student)
    .subscribe(response=>{
      this.messageService.add({severity:'success', summary: 'success', detail: 'บันทึกสำเร็จ'});
      this.router.navigate(['/student'])
    })
  }

  resetStudent(){
    this.addStudentFormGroup.reset();
  }
}
