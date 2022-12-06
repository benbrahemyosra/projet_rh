import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import {
  IBtnConfig,
  ITable,
  ITableData,
} from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { OptionServiceService } from './service/option-service.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  table: ITable = this._optionService.table;
  filter: IFilter = this._optionService.filters;
  constructor(
    public _optionService: OptionServiceService,
    private router: Router,
    private _tableService: TableServiceService,
    private _APP_SERVICE: AppServiceService
  ) {}

  ngOnInit(): void {}

  submitedFilter(form: NgForm) {
    this._tableService.isLoading = true;
    setTimeout(() => {
      this._tableService.isLoading = false;
    }, 1500);
    console.log(form);
  }
  btnClicked(event: { btn: IBtnConfig; index: number }) {
    switch (event.btn.name) {
      case 'Détail':
        this._APP_SERVICE.MODALS_NUMBER.push('option_detail');
        // this._optionService.SELECTED_OPTION = this.table.data[event.index];
        this._optionService.isVisibleDetail = true;
        break;
      case 'Modifier':
        this._APP_SERVICE.MODALS_NUMBER.push('option');
        this._optionService.SELECTED_OPTION = this.table.data[event.index];
        this._optionService.isVisible = true;
        break;
      case 'Supprimer':
        // console.log('qsd');
        break;

      default:
        break;
    }
  }

  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('option');
    this._optionService.isVisible = true;
  }
}
