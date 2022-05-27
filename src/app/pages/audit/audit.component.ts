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
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})

export class AuditComponent implements OnInit {
  private URL: string = ApiService.API_ENDPOINT;
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: any = {};
  audits: any = [];
  dtTrigger: any = new Subject();

  userId: any = "";

  auditForm: FormGroup;

  constructor(private http: HttpClient, public formBuilder: FormBuilder,) { }

  ngOnInit() {
    var currentDate = new Date();
    this.auditForm = this.formBuilder.group({
      jobNo: '',
      partNo: '',
      datePicker1: [null],
      datePicker2: [null],
    })
    this.auditForm.get('datePicker1')?.setValue({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    });

    this.auditForm.get('datePicker2')?.setValue({
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
      order: [[0, 'desc']],
      language: {
        infoEmpty: "There are currently no data.",
        emptyTable: "There are currently no data.",
        zeroRecords: "There are currently no data."
      },
      ajax: (dataTablesParameters: any, callback: any) => {
        var q = this.URL+'/api/Log/GetLogs?search=true'

        var jobNo = this.auditForm.controls["jobNo"].value;
        q += "&jobNo=" + jobNo;
        var partNo = this.auditForm.controls["partNo"].value;
        q += "&partNo=" + partNo;

        var startDate = this.auditForm.controls['datePicker1'].value;
        let sYear = startDate.year;
        let sMonth = startDate.month;
        let sDay = startDate.day;

        if (sMonth <= 9)
          sMonth = '0' + sMonth;

        if (sDay <= 9)
          sDay = '0' + sDay;

        q += "&start=" + (sYear + "-" + sMonth + "-" + sDay);

        var endDate = this.auditForm.controls['datePicker2'].value;
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
            this.audits = resp.data;

            this.dtTrigger.next();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'jobNo' }, { data: 'custDesc' }, { data: 'poNum' }, { data: 'partNo' }, { data: 'jobDue' }, { data: 'qty' }, { data: 'status' }, { data: 'createdDate' }]

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

  ConvertToCSV(objArray, headerList) {
    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'Job No,';

    let newHeaders = ["Cust Desc", "PONum","Part No","Part desc","Due Date","Qty","Status","Created Date"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
 
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line =  this.strRep(array[i]["jobNo"])+ '';
      for (let index in headerList) {
        let head = headerList[index];

        if(head=='jobDue'){
          var date =  this.strRep(array[i][head]).split('T')[0];          
          line += ',' +  date;
        }else if(head=='createdDate'){
          var date =  this.strRep(array[i][head]).replace('T',' ');          
          line += ',' +  date;
        }else{
         line += ',' + this.strRep(array[i][head]);
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  public download = () => {   
    var body = {
   
    }
    var q = this.URL + '/api/Log/Export?download=true'
    var jobNo = this.auditForm.controls["jobNo"].value;
    q += "&jobNo=" + jobNo;
    var partNo = this.auditForm.controls["partNo"].value;
    q += "&partNo=" + partNo;

    var startDate = this.auditForm.controls['datePicker1'].value;
    let sYear = startDate.year;
    let sMonth = startDate.month;
    let sDay = startDate.day;

    if (sMonth <= 9)
      sMonth = '0' + sMonth;

    if (sDay <= 9)
      sDay = '0' + sDay;

    q += "&start=" + (sYear + "-" + sMonth + "-" + sDay);
    var endDate = this.auditForm.controls['datePicker2'].value;
    let eYear = endDate.year;
    let eMonth = endDate.month;
    let eDay = endDate.day;
    if (eMonth <= 9)
      eMonth = '0' + eMonth;

    if (eDay <= 9)
      eDay = '0' + eDay;

    q += "&end=" + (eYear + "-" + eMonth + "-" + eDay + " 23:59:59");
    
    this.http.post(q, body)
      .subscribe((data:any) => {       
        let arrHeader = ["custDesc", "poNum","partNo","partDesc","jobDue","qty","status","createdDate"];

        let csvData = this.ConvertToCSV(data, arrHeader);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", "auditLog.csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
        
      });


  }



}
