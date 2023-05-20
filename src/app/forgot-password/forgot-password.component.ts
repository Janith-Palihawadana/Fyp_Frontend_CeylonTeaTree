import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageService} from "../service/page.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  submit: boolean = false;
  submitSpinner :boolean = false;
  data: any =[];

  constructor(
    private fb: FormBuilder,
    private pageService : PageService,
    private router: Router,
  ) {
    this.forgetPasswordForm = this.fb.group({
      user_name:['',Validators.required],
      cs_email:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  checkUser() {
    var formData: any = new FormData();
    formData.append('cs_user_name', this.forgetPasswordForm.value['user_name']);
    formData.append('cs_user_email', this.forgetPasswordForm.value['cs_email']);
    this.pageService.checkUser(formData).subscribe((response :any) =>{
      this.submit = false;
      this.data = response.data ;
        localStorage.setItem('userName', response.user_name);
        localStorage.setItem('email', response.user_email);
        this.router.navigateByUrl("/changePassword");

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
    return this.forgetPasswordForm.controls;
  }

}
