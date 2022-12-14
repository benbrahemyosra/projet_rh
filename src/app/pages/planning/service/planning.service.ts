import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { environment } from "../../../../environments/environment";
import { AppServiceService } from 'src/app/app-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_planning!: any | null;
  validateForm_tache: FormGroup;
  validateForm_general!: FormGroup;
  total: number;
  typecode: number=0;
  type: number=1;
  btnClicked:string;
  suiv:number=0
  numberOfEmplo:number=0;
  posttache=false;
  suivant:boolean =true;
  idPlanning:number;
  employe:any;
  idtache:number;
  Tvisiblity=new Array();
  liste_employees :Array<any> = [];
  startDate:  Date
  endDate:Date;
  add=false
  constructor(public http: HttpClient, public _router: Router,
    public _APP_SERVICE: AppServiceService,) { }

  table: ITable = {
    header: [
      {
        name: 'titre',
        sortFn: (a: ITableData, b: ITableData) =>
        (a.first_name as string).localeCompare(b.first_name as string),
      sortDirections: ['ascend', 'descend', null],
      visible:true

      },
      {
        name: 'type_planning',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.first_name as string).localeCompare(b.first_name as string),
        sortDirections: ['ascend', 'descend', null],
         visible:true      },
      {
        name: 'date_debut',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.email as string).localeCompare(b.email as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date_fin',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.last_name as string).localeCompare(a.last_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true
      },
    
      {
        name: 'Action',
        sortFn: null,
        sortDirections: [null, null, null],
        visible: true

      },
    ],
    data:  [],
    btnConfig: [
      { name: 'Ajouter Tâche', danger: false, delete: false },
      { name: 'Modifier', danger: false, delete: false },
      { name: 'Supprimer', danger: true, delete: true }

    ],
  };

  filter: IFilter = {
    filters: [
     
      {
        label: 'type planning',
        placeholder: 'type planning',
        input_form_name: 'type_planning',
        input_form_type: 'select',
      },
      {
        label: 'date début',
        placeholder: 'date début',
        input_form_name: 'date_debut',
        input_form_type: 'date',
      },
      {
        label: 'date fin',
        placeholder: 'date fin',
        input_form_name: 'date_fin',
        input_form_type: 'date',
      },
    ],
  };


  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }
  getAllUsers(): Observable<any> {
    return this.http.get(environment.api + 'users');
  }
  getPlanningByQuery(data): Observable<any> {
    return this.http.get(environment.api + 'search_planning',{params:data})

   }

 getAllplanning(data): Observable<any> {
  return this.http.get(environment.api + 'planning', {
    params: data
  })

 }

  getTypePlanning() {
    return this.http.get(environment.api + 'typeplanning')
  }
getTypePlanningByName(name){
  return this.http.get(environment.api + 'typeplanning/'+name)

}
  addPlanning(data: {}) {
    return this.http.post(environment.api + 'planning', data)
  }
  addTache(data){
    return this.http.post(environment.api + 'tache', data)
  }
  updateTache(id,data) {
    return this.http.put(environment.api + 'tache/' + id, data)
  }
  deleteplanning(id: number) {
    return this.http.delete(environment.api + 'planning/' + id)
  }

  updataplanning(id, data) {
    return this.http.put(environment.api + 'planning/' + id, data)
  }

  getAllTache() {
    return this.http.get(environment.api + 'tache')
  }
  getTacheEmp(id) {
    return this.http.get(environment.api + 'show1/'+ id)
  }
  
  getTache(id) {
    return this.http.get(environment.api + 'tache/' + id)
  }
  deletetache(id){
    return this.http.delete(environment.api + 'tache/' + id)
  
   }
}