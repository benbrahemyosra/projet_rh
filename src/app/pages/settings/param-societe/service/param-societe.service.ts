import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamSocieteService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_PARAMS!: any | null;
  current: number = 0;
  total: number;
  constructor(public http: HttpClient) {}
  table: ITable = {
    header: [
      {
        name: "id",
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },
      {
        name: "NbJourSemaine",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
        visible:true

      },
      {
        name: "NbCongeSolde",
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },

      {
        name: "NbHeureJour",
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },

      {
        name: "MinNbHeure",
        sortFn: null,
        sortDirections: [null, null, null],
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
      { name: "Modifier", danger: false, delete: false },
      { name: "Supprimer", danger: true, delete: true },
    ],
  };

  filters: IFilter = {
    filters: [
      {
        label: "id",
        placeholder: "id...",
        input_form_name: "first_name",
        input_form_type: "text",
      },
      {
        label: "nom",
        placeholder: "Nom",
        input_form_name: "last_name",
        input_form_type: "text",
      },
    ],
  };

  getParams(data: any): Observable<any> {
    return this.http.get(environment.api + "parametre", {
      params: data,
    });
  }

  addParams(data: any) {
    return this.http.post(environment.api + "parametre", data);
  }

  updateParams(data: any) {
    return this.http.put(
      environment.api + "parametre/" + this.SELECTED_PARAMS.id,
      data
    );
  }

  deleteParams(id: number) {
    return this.http.delete(environment.api + "parametre/" + id);
  }
}
