import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}
    
    // public static API_ENDPOINT='http://192.168.16.31/m-files';
    public static API_ENDPOINT='http://localhost:55517';
  
    public downloadJT(fileUrl: string) {       
        return this.http.get(ApiService.API_ENDPOINT+`/api/Admin/DownloadJT?fileName=${fileUrl}`, {
            reportProgress: true,
            responseType: 'blob',
        });
    }

    public downloadOrderAnalysis(start: string,end:string) {        
        return this.http.get(ApiService.API_ENDPOINT+`/api/Admin/DownloadOrderAnalysis?start=${start}&end=${end}`, {
            reportProgress: true,
            responseType: 'blob',
        });
    }
}
