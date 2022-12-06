import { Injectable } from '@angular/core';
import { ITable } from 'src/app/interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class TableServiceService {
  isLoading: boolean;
  index:number;
  listeTache: ITable = {
    header: [],
    data:  [],
    btnConfig: [
      { name: 'Modifier', danger: false, delete: false },
      { name: 'Supprimer', danger: true, delete: true}
  
    ],
  };
  constructor() {}
}
