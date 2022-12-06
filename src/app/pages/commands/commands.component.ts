import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import {
  IBtnConfig,
  ITable,
  ITableData,
} from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { CommandServiceService } from './service/command-service.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  SELECTED_COMMAND!: ITableData;
  table: ITable = this._commandService.table;
  filter: IFilter = this._commandService.filters;
  constructor(
    public _commandService: CommandServiceService,
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
        this._APP_SERVICE.MODALS_NUMBER.push('command');
        this._commandService.SELECTED_COMMAND = this.table.data[event.index];
        this._commandService.isVisible = true;
        break;
      default:
        break;
    }
  }
}
