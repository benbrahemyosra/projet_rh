import { Injectable } from '@angular/core';
import { IFilter } from "src/app/interfaces/filter.interface";
import { ITable, ITableData } from "src/app/interfaces/table.interface";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import * as moment from 'moment';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DemandsService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_DEMAND!: any | null;
  current: number = 0;
  total: number;
  demanrefusClicked:boolean;
  isLoading=false;
  constructor(public http: HttpClient) { }

  table: ITable = {
    header: [
      {
        name: 'Employe',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
          sortDirections: ['ascend', 'descend', null],
        visible: localStorage.getItem('role') ==='admin' ? true : false

      },
      {
        name: 'TypeConge',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date_start',
        sortFn: (a: ITableData, b: ITableData) =>
          moment(a.date_at as string, 'DD/MM/YYYY').isAfter(
            moment(b.date_at as string, 'DD/MM/YYYY')
          )
            ? 1
            : -1,
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date_end',
        sortFn: (a: ITableData, b: ITableData) =>
          moment(a.date_at as string, 'DD/MM/YYYY').isAfter(
            moment(b.date_at as string, 'DD/MM/YYYY')
          )
            ? 1
            : -1,
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date_creation',
        sortFn: (a: ITableData, b: ITableData) =>
          moment(a.date_at as string, 'DD/MM/YYYY').isAfter(
            moment(b.date_at as string, 'DD/MM/YYYY')
          )
            ? 1
            : -1,
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'nbJourPris',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'status',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: "Action",
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },
    ],
    data: [],
    btnConfig: [
      { name: 'Détail', danger: false, delete: false },
      { name: 'Télécharger Certificat', danger: false, delete: false },
      { name: "Accepter", danger: false, delete: false },
      { name: "Refuser", danger: false, delete: false },
    ],
  };

  filters: IFilter = {
    filters: [
      {
        label: "nom ",
        placeholder: "Nom et prénom",
        input_form_name: "name",
        input_form_type: "text",
      },
      {
        label: "date",
        placeholder: "Date_demande",
        input_form_name: "date",
        input_form_type: "date",
      },
    ],
  };

  getAllDemands(data: any): Observable<any> { return this.http.get(environment.api + "congesByStatus", {params: data, }) }
  
  getDemandsBystatus(data: any): Observable<any> { return this.http.get(environment.api + "demande", {params: data, }) }


  addDemand(data: any) {
      return this.http.post(environment.api + "demande", data);
    }
  
  updatePost(data: any) {
      return this.http.put(environment.api + "demande/" + this.SELECTED_DEMAND.id,data);
    }
  
    deletePost(id: number) {
      return this.http.delete(environment.api + "demande/" + id);
    }


  getDemandeByQuery(data): Observable<any> {
    return this.http.get(environment.api + 'search_demande',{params:data})}

  acceptDemand() {
    return this.http.post(environment.api + "acceptdemande/" + this.SELECTED_DEMAND.id, this.validateForm.value)
  }

  refusDemand() {
    return this.http.post(environment.api + "refusdemande/" + this.SELECTED_DEMAND.id, this.validateForm.value)
  }

  addCommentaire() {
    return this.http.post(environment.api + "AddCommentaire/" + this.SELECTED_DEMAND.id, this.validateForm.value)
  }
  
}
