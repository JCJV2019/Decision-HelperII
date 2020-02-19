import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  @ViewChild('NavbarComponent', {static: true}) public navbar: NavbarComponent;

  @Output() sidenavClose = new EventEmitter();
  public isLogged: boolean;

  constructor(private authService: AuthService, private routerOut: Router) { }

  ngOnInit() {
    this.onCheckUser();
  }

  public onLogout(): void {
    this.authService.logoutUser();
    this.isLogged = this.authService.getLogged();
    this.navbar.isLogged = false;
    // this.isLogged = false;
    this.routerOut.navigate(['/home']);
  }

  public onCheckUser(): void {
    this.authService.isLogged.subscribe(value => this.isLogged = value);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
