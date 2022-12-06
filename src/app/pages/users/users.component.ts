import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { IBtnConfig, ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { UserServiceService } from './service/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  table: ITable = this._userService.table;
  filter: IFilter = this._userService.filters;

  constructor(
    public _userService: UserServiceService,
    private _tableService: TableServiceService,
    public _APP_SERVICE: AppServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllUSers(1)
  }
  submitedFilter(form: NgForm) {
    this._tableService.isLoading = true;
    setTimeout(() => {
      this._userService.getUserByQuery(form).subscribe((res:any)=>{
        console.log(res)
        this._userService.table.data=res.data
      })
      this._tableService.isLoading = false;
    }, 1500);
    console.log(form);
  }

  btnClicked(event: { btn: IBtnConfig; index: number }) {
    switch (event.btn.name) {
      case 'Détail':
        this._userService.isVisible = true;
        this._APP_SERVICE.MODALS_NUMBER.push('detail-user')
        this._userService.SELECTED_USER = this._userService.table.data[event.index];
        break;
        case 'Supprimer':
          this.deleteUser(this._userService.table.data[event.index].id as number);
        break;
        case 'Modifier':
          this._userService.SELECTED_USER = this._userService.table.data[event.index];
          this._APP_SERVICE.MODALS_NUMBER.push('user');
          this._userService.isVisible = true;
        break;
      default:
        break;
    }
  }

  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('user');
    this._userService.isVisible = true;
  }

  getAllUSers(page: number): void {
    this._tableService.isLoading = true;
    this._userService.getAllUsers({ page: page }).subscribe((res) => {
      this._userService.table.data = res.data;
      this._userService.total = res.total;
      this._tableService.isLoading = false;
    })
  }

  pageChanged(page: number): void {
    this.getAllUSers(page);
  }

  deleteUser(id: number) {
    this._tableService.isLoading = true;
    this._userService.deleteUSer(id).subscribe((res: any) => {
      this.getAllUSers(1);
    });
  }
}
