import { Injectable } from "@angular/core";
import { IFilter } from "src/app/interfaces/filter.interface";
import { ITable, ITableData } from "src/app/interfaces/table.interface";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_POST!: any | null;
  current: number = 0;
  total: number;
  constructor(public http: HttpClient) {}

  table: ITable = {
    header: [
     
      {
        name: "name_post",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
        visible:true

      },
      {
        name: "salary_post",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ["ascend", "descend", null],
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

  getUsersPosts(data: any): Observable<any> {
    return this.http.get(environment.api + "poste", {
      params: data,
    });
  }

  addPost(data: any) {
    return this.http.post(environment.api + "poste", data);
  }

  updatePost(data: any) {
    return this.http.put(
      environment.api + "poste/" + this.SELECTED_POST.id,
      data
    );
  }

  deletePost(id: number) {
    return this.http.delete(environment.api + "poste/" + id);
  }
  
}

