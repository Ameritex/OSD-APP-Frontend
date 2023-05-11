import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, interval } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import {
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '@services/api.service';

class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-blank',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})

export class UserActivityComponent implements OnInit {
  private URL: string = ApiService.API_ENDPOINT;
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  audits: any = [];
  dtTrigger: any = new Subject();

  userId: any = "";

  constructor(private http: HttpClient, public formBuilder: FormBuilder,) { }

  ngOnInit() {
    var currentDate = new Date();
    
    this.dtOptions = {
      lengthChange: false,
      searching: false,
      processing: false,
      serverSide: false,
      responsive: true,
      paging: false,
      sorting: false,
      language: {
        infoEmpty: "",
        emptyTable: "There are currently no data.",
        zeroRecords: "There are currently no data."
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        var q = this.URL+'/api/admin/useractivity'

        this.http
          .get<DataTablesResponse>(q
          ).subscribe(resp => {
            debugger;
            //alert(JSON.stringify(dataTablesParameters));
            this.audits = resp;

            this.dtTrigger.next();
            callback({
              recordsTotal: this.audits.length,
              data: []
            });
          });
      },
      columns: [{ data: 'emplName' }, { data: 'jobNo' }, { data: 'custCode' }, { data: 'partNo' }, { data: 'workCenter' }]
    };

    interval(60000).subscribe(_ => {
      this.rerender();
    });
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      dtInstance.ajax.reload();
    });
  }
  ngAfterViewInit() {
    //Define datatable 
    // this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.on('draw.dt', function () {
        if ($('.dataTables_empty').length > 0) {
          $('.dataTables_empty').remove();
        }
      });

    });
  }
  public search = () => {
    this.rerender();
  }

  strRep(data) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }

}
