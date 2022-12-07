import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { FormGroup } from '@angular/forms';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VacationService {
  constructor(
    public http: HttpClient
  ) { }

  isVisible: boolean = false;
  SELECTED_VACATION!: ITableData;
  total: number;
  validateFormAdd!: FormGroup;
  typeSelect:string=null;
  Tvisiblity=new Array();
  table: ITable = {
    header: [
      {
        name: 'Employe',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
          sortDirections: ['ascend', 'descend', null],
        visible:  true 

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
        name: 'Action',
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },

    ],
    data: [],
    btnConfig: [
      { name: 'Détail', danger: false, delete: false },
      { name: 'Télécharger Certificat', danger: false, delete: false },
      { name: 'Modifier', danger: false, delete: false },


    ],
  };

  filters: IFilter = {
    filters: [
      {
        label: 'Nom',
        placeholder: 'Nom utilisateur',
        input_form_name: 'name',
        input_form_type: 'text',
      },
      {
        label: "statut",
        placeholder: "statut",
        input_form_name: 'status',
        input_form_type: 'select',
      },
      {
        label: 'type congé',
        placeholder: 'type congé',
        input_form_name: 'type',
        input_form_type: 'select',
      },
    ],
  };

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }
  getVacationByIDVacation(id){
    
    return this.http.get(environment.api + 'conges/'+id)

  }
  getAllVacations(data) {
    return this.http.get(environment.api + 'conges', {
      params: data
    })
  }
  getVacationById(id,data){
    return this.http.get(environment.api + 'mes_conges/'+id,{params:data})
  }
  getVacationByQuery(data): Observable<any> {
    return this.http.get(environment.api + 'search_Conges',{params:data})

   }

  addVacations(data: any) {
    console.log(data)
    return this.http.post(environment.api + 'conges', data)
  }

  updateVacations(data: any,id) {
    return this.http.put(environment.api + 'conges/'+id,data)
  }

  getAllTypes() {
    return this.http.get(environment.api + 'typeconge')
  }
}
