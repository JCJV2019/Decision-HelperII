import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  public isLogged: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.onCheckUser();
  }

  public onLogout(): void {
    this.authService.logoutUser();
    this.isLogged = this.authService.getLogged();
    // this.isLogged = false;
    this.router.navigate(['/home']);
  }

  public onCheckUser(): void {
    this.authService.isLogged.subscribe(value => this.isLogged = value);
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
