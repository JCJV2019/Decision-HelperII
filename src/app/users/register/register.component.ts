import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isError: boolean = false;
  msgError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private routeOut: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get name() { return this.registerForm.get('name') };
  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Envío:", this.registerForm.value);

    if (!this.registerForm.invalid) {

      let visualizar = document.getElementsByClassName("loader");
      //console.log("Visualizar:",visualizar[0]);
      visualizar[0].attributes[2].value = "display:block";

      return this.authService
        .registerUser(this.name.value, this.email.value, this.password.value)
        .subscribe(
          data => {
            this.routeOut.onSameUrlNavigation = 'reload';
            this.routeOut.navigate(['/home']);
            this.isError = false;
          },
          error => this.onIsError(error)
        );
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
