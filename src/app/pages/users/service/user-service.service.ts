import { Injectable } from '@angular/core';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from 'src/app/app-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_USER!: any | null;
  validateForm_private: FormGroup;
  validateForm_pro: FormGroup;
  current: number = 0;
  total: number;
  constructor(
    public http: HttpClient,


  ) { }

  table: ITable = {
    header: [
     
      {
        name: 'first_name',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.first_name as string).localeCompare(b.first_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'last_name',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.last_name as string).localeCompare(b.last_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'email',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.email as string).localeCompare(b.email as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Action',
        sortFn: null,
        sortDirections: [null, null, null],
        visible: localStorage.getItem('role') ==='admin' 


      },
    ],
    data: [],
    btnConfig: [
      { name: 'Détail', danger: false, delete: false },
      { name: 'Modifier', danger: false, delete: false },
      { name: 'Supprimer', danger: true, delete: true }

    ],
  };

  filters: IFilter = {
    filters: [
      {
        label: 'Nom',
        placeholder: 'Nom',
        input_form_name: 'first_name',
        input_form_type: 'text',
      },
      {
        label: 'Prenom',
        placeholder: 'Prenom',
        input_form_name: 'last_name',
        input_form_type: 'text',
      },
      {
        label: 'Email',
        placeholder: 'Email',
        input_form_name: 'email',
        input_form_type: 'text',
      },
    ],
  };


  getAllUsers(data: any): Observable<any> {
    return this.http.get(environment.api + 'users', {
      params: data
    })
  }
  getUserByQuery(data): Observable<any> {
    return this.http.get(environment.api + 'search_user',{params:data})

   }
  getUsersTypes() {
    return this.http.get(environment.api + 'typeemployee')
  }

  getUsersPosts() {
    return this.http.get(environment.api + 'poste')
  }

  addUser(data: {}) {
    return this.http.post(environment.api + 'create_user', data)
  }

  deleteUSer(id: number) {
    return this.http.delete(environment.api + 'delete_user/' + id)
  }

  updataUser(id, data) {
    return this.http.put(environment.api + 'update_user/' + id, data)
  }
}
