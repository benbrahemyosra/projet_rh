import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IChef } from 'src/app/interfaces/chef.interface';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefsServiceService {
  SELECTED_CHEF!: IChef | null;
  current: number = 0;
  validateForm!: FormGroup;
  validateForm_restau!: FormGroup;
  IS_VALID_IMAGE_INPUT: boolean = false;
  isVisible = false;
  table: ITable = {
    header: [
      {
        name: 'Nom',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.first_name as string).localeCompare(b.first_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Prénom',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.last_name as string).localeCompare(b.last_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Email',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.email as string).localeCompare(b.email as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Action',
        sortFn: null,
        sortDirections: [null, null, null],
        visible:true

      },
    ],
    data: [
      { first_name: 'qsd', last_name: 'qsd', email: 'qsd@qsd.qsd' },
      { first_name: 'aaa', last_name: 'aaa', email: 'aaa' },
      { first_name: 'bbb', last_name: 'bbb', email: 'aaa' },
      { first_name: 'ccc', last_name: 'ccc', email: 'aaa' },
      { first_name: 'ddd', last_name: 'ddd', email: 'aaa' },
      { first_name: 'eee', last_name: 'eee', email: 'aaa' },
      { first_name: 'fff', last_name: 'fff', email: 'aaa' },
      { first_name: 'ggg', last_name: 'ggg', email: 'aaa' },
      { first_name: 'hhh', last_name: 'hhh', email: 'aaa' },
      { first_name: 'iii', last_name: 'iii', email: 'aaa' },
    ],
    btnConfig: [
      { name: 'Détail', danger: false, delete: false },
      { name: 'Modifier', danger: false, delete: false },
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
        label: 'Prénom',
        placeholder: 'Prénom',
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

  constructor() {}
}
