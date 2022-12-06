import { Component, OnInit } from '@angular/core';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { AppServiceService } from 'src/app/app-service.service';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import {
  IBtnConfig,
  ITable,
  ITableData,
} from 'src/app/interfaces/table.interface';
import { NgForm } from '@angular/forms';
import { MeetingService } from './service/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  SELECTED_COMMAND!: ITableData;
  table: ITable = this.meetingService.table;
  filter: IFilter = this.meetingService.filters;

  constructor(
    public meetingService: MeetingService,
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
        this._APP_SERVICE.MODALS_NUMBER.push('meeting');
        this.meetingService.SELECTED_VACATION = this.table.data[event.index];
        this.meetingService.isVisible = true;
        break;
      default:
        break;
    }
  }
}
