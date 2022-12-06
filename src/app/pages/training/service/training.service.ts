import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor() {}
  isVisible: boolean = false;
  SELECTED_TRAINING!: ITableData;
  validateForm!: FormGroup;

  table: ITable = {
    header: [
      {
        name: 'id',
        sortFn: (a: ITableData, b: ITableData) => (a.id > b.id ? 1 : -1),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: "Nom_utilisateur",
        sortFn: (a: ITableData, b: ITableData) =>
          (a.Nom_utilisateur as string).localeCompare(b.Nom_utilisateur as string),
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
        id: 1,
        Nom_utilisateur: 'User User',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'aaa',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'bbb',
        status: 'En attente',
        date: '14/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'ccc',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'ddd',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'eee',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'fff',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'ggg',
        status: 'En attente',
        date: '10/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'hhh',
        status: 'En attente',
        date: '13/07/2021',
      },
      {
        id: 1,
        Nom_utilisateur: 'iii',
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
        input_form_name: 'Nom_utilisateur',
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
