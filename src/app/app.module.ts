import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { Ma4jay3Component } from './ma4jay3/ma4jay3.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import { PokemonComponent } from './pokemon/pokemon.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { PokemonGoComponent } from './pokemon-go/pokemon-go.component';
@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    Ma4jay3Component,
    StudentComponent,
    AddStudentComponent,
    HomeComponent,
    PokemonComponent,
    NotfoundComponent,
    EditstudentComponent,
    PokemonGoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
