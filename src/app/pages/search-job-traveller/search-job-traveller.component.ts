import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';
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

class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-blank',
  templateUrl: './search-job-traveller.component.html',
  styleUrls: ['./search-job-traveller.component.scss']
})

export class SearchJobTravellerComponent implements OnInit {
  private URL: string = ApiService.API_ENDPOINT;
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  results: any = [];
  dtTrigger: any = new Subject();

  userId: any = "";

  searchForm: FormGroup;

  constructor(private http: HttpClient, public formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit() {
    var currentDate = new Date();
    this.searchForm = this.formBuilder.group({
      jobNo: ''
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      searching: false,
      processing: false,
      serverSide: true,
      responsive: true,
      order: [[0, 'desc']],
      language: {
        infoEmpty: "There are currently no data.",
        emptyTable: "There are currently no data.",
        zeroRecords: "There are currently no data."
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        var q = this.URL + '/api/Admin/SearchJobTravellers'

        var jobNo = this.searchForm.controls["jobNo"].value;
        q += "?jobNo=" + jobNo;

        this.http
          .post<DataTablesResponse>(q,
            dataTablesParameters, {}
          ).subscribe(resp => {
            //alert(JSON.stringify(dataTablesParameters));
            this.results = resp.data;

            this.dtTrigger.next();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'jobNo' }, { data: 'fileName' }, { data: 'createdDate' }]

    };
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

  public download = (fileName) => {
    fileName = fileName + ".pdf"
    this.apiService.downloadJT(fileName).subscribe((data: any) => {
      this.downloadFile(data, fileName);
    });
  }

  private downloadFile(data: any, fileName: any) {
    const downloadedFile = new Blob([data], { type: "application/pdf" });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
  private previewFile(data: any, fileName: any) {
    const downloadedFile = new Blob([data], { type: "application/pdf" });
   
    var fileURL = URL.createObjectURL(downloadedFile);
    var h = $(window).height(); 
    var w = $(window).width(); 
    var left = (window.screen.width/2)-(w/2);
    var top = (window.screen.height/2)-(h/2);
    
    //var win = window.open(fileURL, "_blank", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h);
   
    //win.moveTo(left, top);
    var win = window.open('', "_blank", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h),   
    iframe = document.createElement('iframe'),
    title = document.createElement('title'),
    file = new Blob([data], { type: 'application/pdf' }),
    fileUrl = URL.createObjectURL(file);

    title.appendChild(document.createTextNode('Preview PDF'));

    iframe.src = fileUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';

    win.document.head.appendChild(title);
    win.document.body.appendChild(iframe);
    win.document.body.style.margin = "0";

  }
  public preview = (fileName) => {
    fileName = fileName + ".pdf"
    this.apiService.downloadJT(fileName).subscribe((data: any) => {
      this.previewFile(data, fileName);
    });

  }

}