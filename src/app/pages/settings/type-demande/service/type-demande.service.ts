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
export class TypeDemandeService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_TYPE!: any | null;
  current: number = 0;
  total: number;
  constructor(public http: HttpClient) { }
  table: ITable = {
    header: [

      {
        name: "name",
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },
      {
        name: "actif",
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

  getTypeDemande(data: any): Observable<any> {
    return this.http.get(environment.api + "typedemande", {
      params: data,
    });
  }

  addTypeDemande(data: any) {
    return this.http.post(environment.api + "typedemande", data);
  }

  updateTypeDemande(data: any) {
    return this.http.put(
      environment.api + "typedemande/" + this.SELECTED_TYPE.id,
      data
    );
  }

  deleteTypeDemande(id: number) {
    return this.http.delete(environment.api + "typedemande/" + id);
  }
}
