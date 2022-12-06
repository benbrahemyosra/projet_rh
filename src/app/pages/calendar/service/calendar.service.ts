import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public http: HttpClient) {}

  getPlanning() : Observable<any>{
    return this.http.get(environment.api + "planning");

  }
}
