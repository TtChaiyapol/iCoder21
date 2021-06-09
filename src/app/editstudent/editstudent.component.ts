import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { fromEventPattern } from 'rxjs';
import { AppComponent } from '../app.component';
import { StudentModel, StudentAllCondition, ResponseStudentAll, ResponseEditStudent } from '../student';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {

  nameFormControl =  new FormControl(null,Validators.required);
  emailFormControl = new FormControl(null,[Validators.required, Validators.email]);
  telFormControl = new FormControl(null,Validators.required);

  editStudentFormGroup = new FormGroup({
    id: new FormControl(),
    version: new FormControl(),
    email: this.emailFormControl,
    name: this.nameFormControl,
    tel: this.telFormControl
  });


  constructor(private http : HttpClient,
    private messageService: MessageService,
    private router:Router,
    private route: ActivatedRoute,
    private appComponent : AppComponent
    ){ 
      const student = this.appComponent.editStudent;
      if(student){
        // this.nameFormControl.setValue(student.name);
        // this.emailFormControl.setValue(student.email);
        // this.telFormControl.setValue(student.tel);
        this.editStudentFormGroup.patchValue(student);
      }
    }

  ngOnInit(): void {
  }

  saveStudent(){
    const student = this.editStudentFormGroup.value;
  
    this.http.put<ResponseEditStudent>('/training-demo/student',student)
    .subscribe(response=>{
      console.log(student)
      this.messageService.add({severity:'success', summary: 'success', detail: 'บันทึกสำเร็จ'});
      this.editStudentFormGroup.patchValue({
        version: response.result.version,
      });
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.statusText,
      })
    }
    )
  }

  resetStudent(){
    this.editStudentFormGroup.reset();
  }
}
