import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, NotfoundComponent, SideNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [HomeComponent, NavbarComponent, NotfoundComponent, SideNavbarComponent]
})
export class CommonsModule { }
