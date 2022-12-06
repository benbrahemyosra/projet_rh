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
import { MenuServiceService } from './service/menu-service.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  table: ITable = this._menuService.table;
  filter: IFilter = this._menuService.filters;
  constructor(
    public _menuService: MenuServiceService,
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
        this.router.navigate(['/home/menus/detail']);
        break;
      case 'Modifier':
        this._APP_SERVICE.MODALS_NUMBER.push('menu');
        this._menuService.LIST_OF_DISHES.push(1);
        this._menuService.SELECTED_MENU = this.table.data[event.index];
        this._menuService.isVisible = true;
        break;
      case 'Supprimer':
        console.log('qsd');
        break;

      default:
        break;
    }
  }

  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('menu');
    this._menuService.isVisible = true;
  }
}
