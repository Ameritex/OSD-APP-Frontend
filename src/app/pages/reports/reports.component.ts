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

@Component({
  selector: 'app-blank',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit() {
   
  }

}
