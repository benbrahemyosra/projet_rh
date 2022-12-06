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
export class TypeEmployeeService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_EMP!: any | null;
  current: number = 0;
  total: number;
  filters: IFilter;

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

  getTypeEmployee(data: any): Observable<any> {
    return this.http.get(environment.api + "typeemployee", {
      params: data,
    });
  }

  addTypeEmployee(data: any) {
    return this.http.post(environment.api + "typeemployee", data);
  }

  updateTypeEmployee(data: any) {
    return this.http.put(
      environment.api + "typeemployee/" + this.SELECTED_EMP.id,
      data
    );
  }

  deleteTypeEmployee(id: number) {
    return this.http.delete(environment.api + "typeemployee/" + id);
  }
}
