import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  isVisible: boolean = false;
  SELECTED_VACATION!: ITableData;
  validateForm!: FormGroup;

  constructor() {}
  table: ITable = {
    header: [
      {
        name: 'Id',
        sortFn: (a: ITableData, b: ITableData) => (a.id > b.id ? 1 : -1),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: "Nom_dutilisateur",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.user_name as string).localeCompare(b.user_name as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'status',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'date',
        sortFn: (a: ITableData, b: ITableData) =>
          moment(a.date as string, 'DD/MM/YYYY').isAfter(
            moment(b.date as string, 'DD/MM/YYYY')
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
        Id: 1,
        Nom_dutilisateur: 'User User',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'aaa',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'bbb',
        status: 'En attente',
        date: '14/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'ccc',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'ddd',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'eee',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'fff',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'ggg',
        status: 'En attente',
        date: '10/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'hhh',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        Id: 1,
        Nom_dutilisateur: 'iii',
        status: 'En attente',
        date: '01/07/2021',
      },
    ],
    btnConfig: [{ name: 'Détail', danger: false, delete: false }],
  };

  filters: IFilter = {
    filters: [
      {
        label: 'Id',
        placeholder: 'id...',
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
        input_form_name: 'date',
        input_form_type: 'date',
      },
    ],
  };
}
