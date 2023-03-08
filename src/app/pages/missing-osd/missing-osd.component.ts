import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-missing-osd',
  templateUrl: './missing-osd.component.html',
  styleUrls: ['./missing-osd.component.scss']
})
export class MissingOsdComponent implements OnInit {

  private URL: string = ApiService.API_ENDPOINT;
  
  color: string = "red";
  isLoading: boolean = false;
  isProcessing: boolean = false;
  message: string;
  osdForm: any = {};
  missingOSDs: {
    jobNo: string,
    fileName: string,
    status: string,
    releaseId: string,
    statusColor: string
  }[] = [];

  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit(): void {

    var currentDate = new Date();
    this.osdForm = this.formBuilder.group({    
      datePicker1: [null],
      datePicker2: [null],
    });

    this.osdForm.get('datePicker1')?.setValue({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    });

    this.osdForm.get('datePicker2')?.setValue({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    });

  }

  public processMissingOSDs = () => {

    this.missingOSDs.forEach(m => { 
      m.status = "generating osd...";
      m.statusColor = "orange";
    });

    for(let i = 0; i < this.missingOSDs.length; i++) {
      this.http.get(this.URL+'/api/Admin/GenerateOSDByReleaseId?releaseId=' + this.missingOSDs[i].releaseId)
      .subscribe(data => {           
        if(data["message"]){
          if(data["message"] === "success") {
            this.missingOSDs[i].statusColor = "darkgreen";
            this.missingOSDs[i].status = "success";
            
          }
          else {
            this.missingOSDs[i].statusColor = "red";
            this.missingOSDs[i].status = "error";
          }
        }
      });
    }
  }

  public resetMissingOSDs = () => {

    this.missingOSDs = [];
    this.isLoading = true;
    this.color = "orange";
    this.message = "Loading, Please wait...";

    var q = this.URL+'/api/Admin/GetJobsWithMissingOSD?'

    var startDate = this.osdForm.controls['datePicker1'].value;
    console.log(startDate);

        let sYear = startDate.year;
        let sMonth = startDate.month;
        let sDay = startDate.day;

        if (sMonth <= 9)
          sMonth = '0' + sMonth;

        if (sDay <= 9)
          sDay = '0' + sDay;

        q += "&startDate=" + (sYear + "-" + sMonth + "-" + sDay+ " 00:00:00");

        var endDate = this.osdForm.controls['datePicker2'].value;
        console.log(endDate);
        let eYear = endDate.year;
        let eMonth = endDate.month;
        let eDay = endDate.day;
        if (eMonth <= 9)
          eMonth = '0' + eMonth;

        if (eDay <= 9)
          eDay = '0' + eDay;

        q += "&endDate=" + (eYear + "-" + eMonth + "-" + eDay + " 23:59:59");


    this.http.get(q)
      .subscribe(data => {           
        if(data["message"]){
          if(data["message"] === "Success") {
            this.color = "darkgreen";
          }
          else {
            this.color = "red";
          }
          this.missingOSDs = data["details"].invalidJobs.map((item) => {
            return { "jobNo": item["jobNo"], "fileName": item["fileName"], "status": 'pending', "statusColor": "black", "releaseId": item["releaseId"] }
          });
          this.message = data["message"] + (this.missingOSDs.length == 0 ? ": No Missing OSDs" : "");
        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.message = "";
      });
  }

}
