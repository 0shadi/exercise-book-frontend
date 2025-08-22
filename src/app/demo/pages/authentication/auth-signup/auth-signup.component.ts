import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';
import { RsaService } from 'src/app/services/rsa-service/rsa.service';

@Component({
  selector: 'app-auth-signup',
  standalone: false,
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  // data: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private messageService: MessageServiceService,
    private rsaService: RsaService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=])[A-Za-z\\d!@#$%^&*()_+\\-=]{6,12}$')
        ]
      ],
      role: ['CUSTOMER']
    });
  }

  ngOnInit(): void {
    // this.httpService
    //   .request('GET', '/messages', null)
    //   .then((response: any) => {
    //     this.data = response;
    //   });
  }

  get formControl() {
    return this.registerForm?.controls;
  }

  onSubmitRegister() {
    this.submitted = true;
    if (this.registerForm?.valid) {
      this.httpService
        .request('POST', '/register', {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          login: this.registerForm.value.login,
          role: this.registerForm.value.role,
          password: this.rsaService.encrypt(this.registerForm.value.password)
        })
        .then((response: any) => {
          this.httpService.setAuthToken(response.token);
          this.router.navigate(['/auth/signin']);
        })
        .catch((error: any) => {
          this.messageService.showError(error);
        });
    }
  }
}
