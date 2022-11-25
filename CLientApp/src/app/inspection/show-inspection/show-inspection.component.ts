import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service'

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  inspectionTypeList:any=[];

  //Map to display data associate with foreign keys
  inspectionTypeMap:Map<number, string>= new Map()

  constructor(private service:InspectionApiService) { }

  //Variables Properties
  modalTitle:string = ''
  activateAddEditInspectionComponet:boolean = false;
  inspection:any;

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();
    this.refreshInspectionTypeMap();
  }

  //for maping type of inspection
  refreshInspectionTypeMap(){
    this.service.getInspectionTypeList().subscribe(data =>{
      this.inspectionTypeList = data;

      for(let i = 0; i < data.length; i++){
        this.inspectionTypeMap.set(
          this.inspectionTypeList[i].id,this.inspectionTypeList[i].inspectionName
        );
      }
    })
  }

  //For call for add or edit 
  modalAdd(){
    this.inspection ={
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null
    }
    this.modalTitle = "Add Inspection";
    this.activateAddEditInspectionComponet = true ;
  }

  modalEdit(item:any){
    this.inspection = item;
    this.modalTitle = "Edit Inspection";
    this.activateAddEditInspectionComponet = true;
  }

  delete(item:any){
    if(confirm(`Are you sure you want to delete inpsection ${item.id}`)){
      this.service.deleteInspection(item.id).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }
      var showUpdateSuccess = document.getElementById('delete-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display="block";
      }
      setTimeout(() => {
        if(showUpdateSuccess){
          showUpdateSuccess.style.display="none";
        }
      }, 4000);
      this.inspectionList$ = this.service.getInspectionList();
      })
    }
  }

  modalClose(){
    this.activateAddEditInspectionComponet = false;
    this.inspectionList$ = this.service.getInspectionList();
  }
}
