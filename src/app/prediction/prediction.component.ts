import { Component, OnInit } from '@angular/core';
import {UploadService} from "../service/upload.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  url = "##pastetheurloftheimage"
  isActive = false;
  predictIsActive = false;
  status = true;
  file !: File ;
  imageUrl : string;
  diseases_name:any
  diseases_no:any
  errorMessage: any;


  constructor(
    private uploadService : UploadService,
    private router: Router,
  ) {
    this.imageUrl = '';
  }

  ngOnInit(): void {
  }

  selectFile(event:any){

    if(event.target.files){
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      this.isActive = true;
      this.status = false;
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
      this.file = event.target.files[0];
    }
  }

  predictDiseases() {
    const formData = new FormData();
    formData.append('image', this.file ,this.file.name);
    this.uploadService.getData(formData).subscribe( (response :any) => {
      this.predictIsActive = true;
      this.diseases_name = response.prediction_result;
      this.errorMessage = '';
      if(this.diseases_name == "Anthracnose"){
        this.diseases_no = 1
      }
      else if(this.diseases_name == "algal leaf"){
        this.diseases_no = 2
      }
      else if(this.diseases_name == "bird eye spot"){
        this.diseases_no = 3
      }
      else if(this.diseases_name == "brown blight"){
        this.diseases_no = 4
      }
      else if(this.diseases_name == "gray light"){
        this.diseases_no = 5
      }
      else if(this.diseases_name == "healthy"){
        this.diseases_no = 6
      }
      else if(this.diseases_name == "red leaf spot"){
        this.diseases_no = 7
      }
      else if(this.diseases_name == "white spot"){
        this.diseases_no = 8
      }
      this.imageUrl = response.url;
    }, error => {
      this.predictIsActive = true;
      this.diseases_name = '';
      this.errorMessage = error.error.error;
    });
  }

  diseasesDetails(param: any) {
    this.router.navigate(['/diseases', param])
  }

  cancelImage() {
    this.status = true;
    this.isActive = false;
    this.predictIsActive = false;
  }
}
