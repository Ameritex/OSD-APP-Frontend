import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ApiService } from '@services/api.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-blank',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.scss']
})

export class BOMComponent implements OnInit {
  private URL: string = ApiService.API_ENDPOINT;
 
  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit() {
   
  }

  
  public runBOM = () => {    
    var body = {
   
    }  
    var q = this.URL + '/api/Admin/BOM'
    this.http.post(q,body)
    .subscribe((data:any) => {    
        if(data.success){
          alert("File " + data.file +" has been generated successfully")     
        }else{
          alert("Some errors occur. Please try again")     
        }
 
    });
  }
 
   public runProductStatements = () => {    
    var body = {
   
    }  
    var q = this.URL + '/api/Admin/ProductStatements'
    this.http.post(q,body)
    .subscribe((data:any) => {    
        if(data.success){
          alert("File " + data.file +" has been generated successfully")     
        }else{
          alert("Some errors occur. Please try again")     
        }
 
    });
  }
  
  
  public runSchedulerStatements = () => {    
    var body = {
   
    }  
    var q = this.URL + '/api/Admin/SchedulerStatements'
    this.http.post(q,body)
    .subscribe((data:any) => {    
        if(data.success){
          alert("File " + data.file +" has been generated successfully")     
        }else{
          alert("Some errors occur. Please try again")     
        }
 
    });
  }
  

}
