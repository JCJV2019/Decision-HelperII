import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatCardModule,
        MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule
     ],
  exports: [MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule],
  declarations: []
})
export class MaterialModule { }
