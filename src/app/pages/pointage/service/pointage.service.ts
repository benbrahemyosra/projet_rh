import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_POST!: any | null;
  current: number = 0;
  total: number;
  idPointage:number;

  heure:any;
  verif=false;
  constructor(public http: HttpClient) { }
  table: ITable = {
    header: [
      {
        name: 'Employe',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
          sortDirections: ['ascend', 'descend', null],
        visible: true

      },
      {
        name: "date_debut",
        sortFn: (a: ITableData, b: ITableData) =>
        moment(a.date_at as string, 'DD/MM/YYYY').isAfter(
          moment(b.date_at as string, 'DD/MM/YYYY')
        )
          ? 1
          : -1,
        sortDirections: ["ascend", "descend", null],
        visible:true

      },
      {
        name: "date_debut_pause",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
        visible:true

      },
      {
        name: "date_fin_pause",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
        visible:true

      },
      {
        name: "date_fin",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
        visible:true

      },{
      name: "NB_heures",
      sortFn: (a: ITableData, b: ITableData) =>
        (a.name as string).localeCompare(b.name as string),
      sortDirections: ["ascend", "descend", null],
      visible:true

    },
    {
      name: "NB_heures_supplementaires",
      sortFn: (a: ITableData, b: ITableData) =>
        (a.name as string).localeCompare(b.name as string),
      sortDirections: ["ascend", "descend", null],
      visible:true

    },
    ],
    data: [],

    btnConfig: [

    ],
  };
  filters: IFilter = {
    filters: [
      {
        label: "date ",
        placeholder: "date",
        input_form_name: "date",
        input_form_type: "date",
      },
      {
        label: "name",
        placeholder: "Nom d'employée",
        input_form_name: "name",
        input_form_type: "text",
      },
    ],
  };

  getDatePointageofUser(data: any,id): Observable<any> {
    return this.http.get(environment.api + "pointage/"+id, {
      params: data,
    });
  } 
  getAllDatePointage(data: any): Observable<any> {
    return this.http.get(environment.api + "pointage/", {
      params: data,
    });
  } 
  getPosition(id){
    return this.http.get(environment.api + "positionPoint/"+id);
  }
  getPointageByQuery(data): Observable<any> {
    return this.http.get(environment.api + 'search_pointage',{params:data})

   }
AddDateStart(data){
  return this.http.post(environment.api +"pointage",data);
}

AddDatePause(date,id,str,nb){
  return this.http.put(environment.api +"pointage/"+id,{ 'date':date,
   'whoClicked':str,'nbheure':nb})
}
}
