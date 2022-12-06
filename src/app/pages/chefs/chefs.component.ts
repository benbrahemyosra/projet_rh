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
import { ChefsServiceService } from './service/chefs-service.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
})
export class ChefsComponent implements OnInit {
  table: ITable = this._chefService.table;
  filter: IFilter = this._chefService.filters;
  constructor(
    public _chefService: ChefsServiceService,
    private _tableService: TableServiceService,
    private _APP_SERVICE: AppServiceService,
    private router: Router
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
        this.router.navigate(['/home/chefs/detail']);
        break;
      case 'Modifier':
        this._APP_SERVICE.MODALS_NUMBER.push('chef');
        this._chefService.SELECTED_CHEF = this.table.data[event.index];
        this._chefService.isVisible = true;
        break;

      default:
        break;
    }
  }

  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('chef');
    this._chefService.isVisible = true;
  }
}
