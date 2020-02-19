import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { QuestionListComponent } from './question-list/question-list.component';

@NgModule({
  declarations: [MemberListComponent, QuestionListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [MemberListComponent, QuestionListComponent]
})
export class MemberModule { }
