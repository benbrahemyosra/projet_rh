import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceService {
  constructor() {}
  SELECTED_MENU!: ITableData | null;
  LIST_OF_DISHES: number[] = [];
  LIST_OF_OPTIONS: number[] = [];
  IS_VALID_IMAGE_INPUT: boolean = false;
  isVisible: boolean = false;
  validateForm!: FormGroup;
  table: ITable = {
    header: [
      {
        name: 'Nom',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.name as string).localeCompare(b.name as string),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Chef',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.chef_email as string).localeCompare(b.chef_email as string),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Prix',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.price as number) - (b.price as number),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Action',
        sortFn: null,
        sortDirections: [null, null, null],
      },
    ],
    data: [
      { name: 'Menu', chef_email: 'qsd@qsd.qsd', price: 12 },
      { name: 'aaa', chef_email: 'aaa', price: 10 },
      { name: 'bbb', chef_email: 'bbb', price: 10 },
      { name: 'ccc', chef_email: 'ccc', price: 10 },
      { name: 'ddd', chef_email: 'ddd', price: 10 },
      { name: 'eee', chef_email: 'eee', price: 10 },
      { name: 'fff', chef_email: 'fff', price: 10 },
      { name: 'ggg', chef_email: 'ggg', price: 10 },
      { name: 'hhh', chef_email: 'hhh', price: 10 },
      { name: 'iii', chef_email: 'iii', price: 10 },
    ],
    btnConfig: [
      { name: 'Détail', danger: false, delete: false },
      { name: 'Modifier', danger: false, delete: false },
      { name: 'Supprimer', danger: true, delete: true },
    ],
  };

  filters: IFilter = {
    filters: [
      {
        label: 'Nom',
        placeholder: 'Nom du chef',
        input_form_name: 'chef_name',
        input_form_type: 'text',
      },
      {
        label: 'Nom',
        placeholder: 'Nom',
        input_form_name: 'name',
        input_form_type: 'text',
      },
    ],
  };
}
