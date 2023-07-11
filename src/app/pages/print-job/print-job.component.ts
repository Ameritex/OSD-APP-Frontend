import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-blank',
  templateUrl: './print-job.component.html',
  styleUrls: ['./print-job.component.scss']
})

export class PrintJobComponent implements OnInit {
  public progress: number;
  public message: string;
  public messageClass: string;

  private URL: string = ApiService.API_ENDPOINT;
 
  public list: any;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // public uploadFile = (files) => {

  //   if (files.length === 0) {
  //     return;
  //   }

  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);

  //   this.http.post(this.URL+'/api/Admin/Upload', formData,)
  //     .subscribe(data => {     
      
  //       if(data["success"]){
  //         this.list = data["data"];
  //         this.message = 'Upload successfully.';
  //         this.fileName =  data["file"];     
  //       }else{
  //         this.message = 'Upload was failed.';
  //       }
       
  //     });
  // }

  public changeText = () => {
   this.message = "";
  }

  public printJobRoute = (jobNo) => {
    if (jobNo == null || jobNo.length == 0) {
      alert('Please enter Job Number')
      return;
    }
    var body = {
      jobNo: jobNo
    }
    this.http.post(this.URL+'/api/Admin/PrintJobRoute', body,)
      .subscribe(data => {           
        if(data["message"]){
         this.message = data["message"];
         this.messageClass = data["success"] == true ? "greenMessage" : "redMessage"
        }
      });
  }


  // public updateMultipleJobs = (note) => {
  //   if (this.fileName == null || this.fileName.length == 0) {
  //     alert('Please upload the file')
  //     return;
  //   }
  //   var body = {
  //     fileName: this.fileName,
  //     note:note
  //   }
  //   this.http.post(this.URL+'/api/Admin/PostJobs', body,)
  //     .subscribe(data => {       
  //       if(data["message"]){
  //        this.message = data["message"];
  //       }
        
  //     });
  // }

}
