import { EventEmitter, Injectable } from '@angular/core';
import { ITableData } from './interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  MODALS_NUMBER: string[] = [];
  role
  closeDialog = new EventEmitter<null>();
  constructor() {}
}
