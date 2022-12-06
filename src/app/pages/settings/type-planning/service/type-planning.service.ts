import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypePlanningService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_PLANNING!: any | null;
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
        name: "code",
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


  getTypePlanning(data: any): Observable<any> {
    return this.http.get(environment.api + "typeplanning", {
      params: data,
    });
  }

  addTypePlanning(data: any) {
    return this.http.post(environment.api + "typeplanning", data);
  }

  updateTypePlanning(data: any) {
    return this.http.put(environment.api + "typeplanning/" + this.SELECTED_PLANNING.id,data);
  }

  deleteTypePlanning(id: number) {
    return this.http.delete(environment.api + "typeplanning/" + id);
  }
}
