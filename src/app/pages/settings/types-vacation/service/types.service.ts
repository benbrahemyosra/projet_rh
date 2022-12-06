import { Injectable } from '@angular/core';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_TYPE!: any | null;
  current: number = 0;
  total: number;

  constructor(
    private http: HttpClient
  ) { }

  table: ITable = {
    header: [ 
      {
        name: 'name',
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },

      {
        name: 'name',
        sortFn: null,
        sortDirections: [null, null, null],
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
      { name: 'Modifier', danger: false, delete: false },
      { name: 'Supprimer', danger: true, delete: true }

    ],
  };


  getTypes(data): Observable<any> {
    return this.http.get(environment.api + "typeconge",{params:data});
  }

  addTypes(data: any) {
    return this.http.post(environment.api + "typeconge", data);
  }

  updateTypes(data: any) {
    return this.http.put(
      environment.api + "typeconge/" + this.SELECTED_TYPE.id,
      data
    );
  }

  deleteTypes(id:number) {
    return this.http.delete(environment.api + "typeconge/" + id);
  }
}
