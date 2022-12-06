import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RapportCongeService {
  validateForm!: FormGroup;
  isVisible = false;
  SELECTED_RAPPORT!: any | null;
  current: number = 0;
  total: number;
  result:string;
  info:any;
  rapport:any;
  image:string;
  detail:boolean;
  constructor(public http: HttpClient) { }

  getResultatRapport(data) {
    return this.http.get(environment.api + 'resultatRapport',{params:data})
  }
 

}
