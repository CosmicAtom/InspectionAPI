import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionApiUrl = "https://localhost:44328/api";
  constructor(private http:HttpClient) { }

  //For Inspection
  getInspectionList():Observable<any[]>{
    return this.http.get<any>(this.inspectionApiUrl + '/inspections');
  }

  addInspection(data:any){
    return this.http.post(this.inspectionApiUrl + '/inspections', data);
  }

  updateInspection(id:number|string, data:any){
    return this.http.post(this.inspectionApiUrl + `/inspections/${id}`, data);
  }

  deleteInspection(id:number|string){
    return this.http.delete(this.inspectionApiUrl + `/inspections/${id}`);
  }

  //for InspectionTypes
  getInspectionTypeList():Observable<any[]>{
    return this.http.get<any>(this.inspectionApiUrl + '/inspectionTypes');
  }

  addInspectionType(data:any){
    return this.http.post(this.inspectionApiUrl + '/inspectionTypes', data);
  }

  updateInspectionType(id:number|string, data:any){
    return this.http.post(this.inspectionApiUrl + `/inspectionTypes/${id}`, data);
  }

  deleteInspectionType(id:number|string){
    return this.http.delete(this.inspectionApiUrl + `/inspectionTypes/${id}`);
  }

  //For Status
  getStatusList():Observable<any[]>{
    return this.http.get<any>(this.inspectionApiUrl + '/Status');
  }

  addStatus(data:any){
    return this.http.post(this.inspectionApiUrl + '/Status', data);
  }

  updateStatus(id:number|string, data:any){
    return this.http.post(this.inspectionApiUrl + `/Status/${id}`, data);
  }

  deleteStatus(id:number|string){
    return this.http.delete(this.inspectionApiUrl + `/Status/${id}`);
  }
}