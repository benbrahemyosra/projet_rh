import { Component, OnInit } from '@angular/core';
import { TrainingService } from './service/training.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { AppServiceService } from 'src/app/app-service.service';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import {
  IBtnConfig,
  ITable,
  ITableData,
} from 'src/app/interfaces/table.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  SELECTED_COMMAND!: ITableData;
  table: ITable = this.trainingService.table;
  filter: IFilter = this.trainingService.filters;

  constructor(
    public trainingService: TrainingService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService
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
        this._APP_SERVICE.MODALS_NUMBER.push('training');
        this.trainingService.SELECTED_TRAINING = this.table.data[event.index];
        this.trainingService.isVisible = true;
        break;
      default:
        break;
    }
  }
}
