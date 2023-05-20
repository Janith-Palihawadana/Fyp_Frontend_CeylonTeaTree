import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {PageService} from "../service/page.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submit: boolean = false;
  submitSpinner :boolean = false;

  constructor(
    private fb: FormBuilder,
    private pageService : PageService,
    private router:Router,
  ) {
    this.loginForm = this.fb.group({
      cs_user_name:['',Validators.required],
      cs_user_password:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submitLogin() {
    if(this.loginForm.invalid){
      this.submitSpinner = false;
      return;
    }
    var formData: any = new FormData();
    formData.append('cs_user_name', this.loginForm.value['cs_user_name']);
    formData.append('cs_user_password', this.loginForm.value['cs_user_password']);
    this.pageService.login(formData).subscribe((response :any) =>{
      this.submit = false;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User login Successful',
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      })
      localStorage.setItem('Token', response.access_token);
      this.router.navigateByUrl("/home");

    },(error:any) =>{
      let errorMessage = "Oops! Something went wrong.";
      if (error && error.error && error.error.error) {
        errorMessage = error.error.error;
      }
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      })
    });
  }

  get f2(){
    return this.loginForm.controls;
  }
}
