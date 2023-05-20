import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PageService} from "../service/page.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  submit : boolean = false;
  submitSpinner : boolean = false;
  message: any;

  constructor(
    private pageService : PageService,
    private fb: FormBuilder,
    private router:Router,

  ) {
    this.signUpForm = this.fb.group({
      cs_user_full_name:['',Validators.required],
      cs_user_name:['',Validators.required],
      cs_user_email:['',Validators.required],
      cs_user_password:['',Validators.required],
    })
  }

  ngOnInit(): void {

  }

  get f1(){
    return this.signUpForm.controls;
  }


  createAccount() {
    this.submit = true;
    if(this.signUpForm.invalid){
      return;
    }
    var formData: any = new FormData();
    formData.append('cs_user_full_name', this.signUpForm.value['cs_user_full_name']);
    formData.append('cs_user_name', this.signUpForm.value['cs_user_name']);
    formData.append('cs_user_email', this.signUpForm.value['cs_user_email']);
    formData.append('cs_user_password', this.signUpForm.value['cs_user_password']);
    this.pageService.createAccount(formData).subscribe((response :any) =>{
      this.submit = false;
      this.message = response.msg
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Create Account Successful',
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      })
      this.router.navigateByUrl("/login");
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
      this.submit = false;
    });
  }

}
