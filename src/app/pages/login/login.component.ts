import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from "./service/login.service";
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //forme composant 
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public loginService: LoginService,public _APP_SERVICE: AppServiceService,
    ) {
    this.validateForm = this.fb.group({
      email: [
        '',
        [
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Effacer tous les éléments
    localStorage.clear()
  }

  submitForm(value: { email: string; password: string }): void {
    console.log(value)
    this.loginService.login(value).subscribe((res: any) => {
      if (res.token) {
        console.log(res);
        localStorage.setItem('iduser',res.user.id);
        localStorage.setItem('token', res.token as string);
        localStorage.setItem('role', res.user.role as string);
        this._APP_SERVICE.role= localStorage.getItem('role');
        this.router.navigate(['/home/calendar']);
      }
    }); 

  }
 
}
