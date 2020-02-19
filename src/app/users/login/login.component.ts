import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean = false;
  msgError: string = '';
  //idUser: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email') };
  get password() { return this.loginForm.get('password') };

  ngOnInit() {}

  onSubmit() {
    let visualizar = document.getElementsByClassName("loader");
    //console.log("Visualizar:",visualizar[0]);
    visualizar[0].attributes[2].value = "display:block";

    if(!this.loginForm.invalid) {
      console.log("Envío:",this.loginForm.value,this.isError);
      return this.authService
      .loginUser(this.email.value, this.password.value)
      .subscribe(
        data => {
          console.log("Recibo:",data);
          if(data.id_user && data.token && data.name_user) {
            const token = data.token;
            this.authService.setUser(data.id_user);
            this.authService.setName(data.name_user);
            this.authService.setToken(token);

            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/home']);
            this.isError = false;
          } else {
            this.onIsError({error: data.message});
          }
        },
        error => this.onIsError(error)
      );
    } else {
      this.onIsError({error: 'Faltan Datos'});
    }
  }

  onIsError(err): void {
    this.msgError = err.error;
    this.isError = true;
    let visualizar = document.getElementsByClassName("loader");
    //console.log("Visualizar:",visualizar[0]);
    visualizar[0].attributes[2].value = "display:none";
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
