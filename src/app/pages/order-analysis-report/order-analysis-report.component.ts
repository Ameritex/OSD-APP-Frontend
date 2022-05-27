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

class DataTablesResponse {
  data: any[] = [];
  draw: number = 0;
  recordsFiltered: number = 0;
  recordsTotal: number = 0;
}

@Component({
  selector: 'app-blank',
  templateUrl: './order-analysis-report.component.html',
  styleUrls: ['./order-analysis-report.component.scss']
})

export class OrderAnalysisReportComponent implements OnInit {
  private URL: string = ApiService.API_ENDPOINT;
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  reports: any = [];
  dtTrigger: any = new Subject();

  userId: any = "";

  reportForm: FormGroup;

  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit() {
    var currentDate = new Date();
    this.reportForm = this.formBuilder.group({    
      datePicker1: [null],
      datePicker2: [null],
    })
    this.reportForm.get('datePicker1')?.setValue({
      year: currentDate.getFullYear(),
      month: 1,
      day: 1
    });

    this.reportForm.get('datePicker2')?.setValue({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,    
      searching: false,
      processing: false,
      serverSide: true,
      responsive: true,
      order: [[2, 'desc']],
      language: {
        infoEmpty: "There are currently no data.",
        emptyTable: "There are currently no data.",
        zeroRecords: "There are currently no data."
      },
      ajax: (dataTablesParameters: any, callback: any) => {
       
        var q = this.URL+'/api/Admin/OrderAnalysis?search=true'

        var startDate = this.reportForm.controls['datePicker1'].value;
        let sYear = startDate.year;
        let sMonth = startDate.month;
        let sDay = startDate.day;

        if (sMonth <= 9)
          sMonth = '0' + sMonth;

        if (sDay <= 9)
          sDay = '0' + sDay;

        q += "&start=" + (sYear + "-" + sMonth + "-" + sDay+ " 00:00:00");

        var endDate = this.reportForm.controls['datePicker2'].value;
        let eYear = endDate.year;
        let eMonth = endDate.month;
        let eDay = endDate.day;
        if (eMonth <= 9)
          eMonth = '0' + eMonth;

        if (eDay <= 9)
          eDay = '0' + eDay;

        q += "&end=" + (eYear + "-" + eMonth + "-" + eDay + " 23:59:59");

        this.http
          .post<DataTablesResponse>(q,
            dataTablesParameters, {}
          ).subscribe(resp => {
            //alert(JSON.stringify(dataTablesParameters));
            this.reports = resp.data;

            this.dtTrigger.next();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'orderNo' },{data:'jobNo'},{data:'orderDate'},{data:'customer', orderable: false},{data:'productCode', orderable: false},{data:'workCode', orderable: false},{data:'partNumber', orderable: false},{data:'qty', orderable: false},{data:'unitPrice', orderable: false},{data:'total', orderable: false},{data:'shippingCharges', orderable: false},{data:'weight', orderable: false},{data:'shippingAddress', orderable: false},{data:'shippingToCity', orderable: false},{data:'shippingToState', orderable: false},{data:'salesPerson', orderable: false},{data:'industry', orderable: false},{data:'accountType', orderable: false}]

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
  
  public download = () => {   
    var startDate = this.reportForm.controls['datePicker1'].value;
    let sYear = startDate.year;
    let sMonth = startDate.month;
    let sDay = startDate.day;

    if (sMonth <= 9)
      sMonth = '0' + sMonth;

    if (sDay <= 9)
      sDay = '0' + sDay;

    var start = (sYear + "-" + sMonth + "-" + sDay+ " 00:00:00");
    var endDate = this.reportForm.controls['datePicker2'].value;
    let eYear = endDate.year;
    let eMonth = endDate.month;
    let eDay = endDate.day;
    if (eMonth <= 9)
      eMonth = '0' + eMonth;

    if (eDay <= 9)
      eDay = '0' + eDay;

    var end = (eYear + "-" + eMonth + "-" + eDay + " 23:59:59");
    this.apiService.downloadOrderAnalysis(start,end).subscribe((data: any) => {
      this.downloadFile(data, "Order Analysis_"+sYear+sMonth+sDay+"_"+eYear+eMonth+eDay+".xlsx");
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

}
