import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppComponent } from '../app.component';
import {
  ResponseStudentAll,
  Student,
  StudentAllCondition,
  StudentModel,
} from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  // student: Student = {
  //   name: 'Title',
  //   tel: '12312',
  //   email: '124653'
  // };
  // students: Student[] = [
  //   { name: 'BoppinCode',
  //     email: 'zemorez@gmail.com',
  //     tel: '025456575'
  //   },
  //   { name: 'BoppinCode',
  //     email: 'zemorez@gmail.com',
  //     tel: '025456575'
  //   },
  //   { name: 'BoppinCode',
  //     email: 'zemorez@gmail.com',
  //     tel: '025456575'
  //   },
  //   { name: 'BoppinCode',
  //     email: 'zemorez@gmail.com',
  //     tel: '025456575'
  //   },
  //   { name: 'BoppinCode',
  //     email: 'zemorez@gmail.com',
  //     tel: '025456575'
  //   }
  // ]

  studentModels: StudentModel[] = [];

  nameFormControl = new FormControl();
  emailFormControl = new FormControl();
  telFormControl = new FormControl();

  studentConditionFormGroup = new FormGroup({
    name: this.nameFormControl,
    email: this.emailFormControl,
    tel: this.telFormControl,
  });

  constructor(
    public http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {}

  clearStudent() {
    this.studentModels = [];
    this.studentConditionFormGroup.reset();
  }

  queryStudent() {
    console.log(this.nameFormControl.value);
    console.log(this.emailFormControl.value);
    console.log(this.telFormControl.value);

    const name = this.nameFormControl.value;
    const email = this.emailFormControl.value;
    const tel = this.telFormControl.value;

    const condition: StudentAllCondition = {};

    if (name) {
      condition.name = name;
    }
    if (email) {
      condition.email = email;
    }
    if (tel) {
      condition.tel = tel;
    }

    const httpParams = new HttpParams({ fromObject: condition as any });

    this.http
      .get<ResponseStudentAll>('/training-demo/student/all', {
        params: httpParams,
      })
      .subscribe(
        (response) => {
          this.studentModels = response.result;
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.statusText,
          });
        }
      );
  }

  deleteStudent(student: StudentModel) {
    this.http
      .delete(`/training-demo/student/${student.id}`)
      .subscribe((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'ลบสำเร็จแล้ว',
        });

        const index = this.studentModels.findIndex(
          (model) => model.id === student.id
        );
        if (index >= 0) {
          this.studentModels.splice(index, 1);
        }

        this.queryStudent();
      });
  }

  editStudent(student: StudentModel){
      this.appComponent.editStudent = student;
      this.router.navigate(['/edit']);
  }


}
