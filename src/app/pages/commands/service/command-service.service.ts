import { Injectable } from '@angular/core';
import { IFilter, ISelect } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class CommandServiceService {
  SELECTED_COMMAND!: ITableData;
  STATUS: ISelect[] = [
    { name: 'En cours', value: 0 },
    { name: 'En attente', value: 1 },
    { name: 'En livraison', value: 2 },
    { name: 'Terminée', value: 3 },
    { name: 'Annulée', value: 4 },
  ];
  isChef = localStorage.getItem('isChef');
  isVisible: boolean = false;
  isVisibleUserCommands: boolean = false;
  table: ITable = {
    header: [
      {
        name: 'Nom du chef',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.chef_name as string).localeCompare(b.chef_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: "Nom d'utilisateur",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.user_name as string).localeCompare(b.user_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Statut',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date de demande',
        sortFn: (a: ITableData, b: ITableData) =>
          moment(a.date_at as string, 'DD/MM/YYYY').isAfter(
            moment(b.date_at as string, 'DD/MM/YYYY')
          )
            ? 1
            : -1,
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
      {
        chef_name: 'Chef Chef',
        user_name: 'User User',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'aaa',
        user_name: 'aaa',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'bbb',
        user_name: 'bbb',
        status: 'En Cours',
        date_at: '14/07/2021',
      },
      {
        chef_name: 'ccc',
        user_name: 'ccc',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'ddd',
        user_name: 'ddd',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'eee',
        user_name: 'eee',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'fff',
        user_name: 'fff',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'ggg',
        user_name: 'ggg',
        status: 'En Cours',
        date_at: '10/07/2021',
      },
      {
        chef_name: 'hhh',
        user_name: 'hhh',
        status: 'En Cours',
        date_at: '13/07/2021',
      },
      {
        chef_name: 'iii',
        user_name: 'iii',
        status: 'En Cours',
        date_at: '01/07/2021',
      },
    ],
    btnConfig: [{ name: 'Détail', danger: false, delete: false }],
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
        label: "Nom de l'utilisateur",
        placeholder: "Nom d'utilisateur",
        input_form_name: 'user_name',
        input_form_type: 'text',
      },
      {
        label: 'date de demande',
        placeholder: 'date de demande',
        input_form_name: 'date_at',
        input_form_type: 'date',
      },
      {
        label: 'Status de commande',
        placeholder: 'Statut de commande',
        input_form_name: 'status',
        input_form_type: 'select',
        select_data: this.STATUS,
      },
    ],
  };

  constructor() {
    // this deletes the chef inputs when he is connected
    if (this.isChef) {
      this.table.header = this.table.header.slice(1);
      this.table.data = this.table.data.map((e: ITableData) => ({
        user_name: e.user_name,
        status: e.status,
        date_at: e.date_at,
      }));
      this.filters.filters = this.filters.filters.slice(1);
    }
  }
}
