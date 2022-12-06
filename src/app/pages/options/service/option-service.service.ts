import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable, ITableData } from 'src/app/interfaces/table.interface';

@Injectable({
  providedIn: 'root',
})
export class OptionServiceService {
  SELECTED_OPTION!: ITableData | null;
  validateForm!: FormGroup;
  IS_VALID_IMAGE_INPUT: boolean = false;
  isVisible: boolean = false;
  isVisibleDetail: boolean = false;
  table: ITable = {
    header: [
      {
        name: 'Nom',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.title as string).localeCompare(b.title as string),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Prix',
        sortFn: (a: ITableData, b: ITableData) => (a.price > b.price ? 1 : -1),
        sortDirections: ['ascend', 'descend', null],
        visible:true

      },
      {
        name: 'Image',
        sortFn: null,
        sortDirections: [null, null, null],
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
        title: 'option',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'aaa',
        price: 20,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'bbb',
        price: 50,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'ccc',
        price: 11,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'ddd',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'eee',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'fff',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'ggg',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'hhh',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
      {
        title: 'iii',
        price: 10,
        image: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      },
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
        placeholder: 'Nom',
        input_form_name: 'option_name',
        input_form_type: 'text',
      },
      {
        label: 'Prix',
        placeholder: 'Prix',
        input_form_name: 'price',
        input_form_type: 'number',
      },
    ],
  };

  constructor() {}
}
