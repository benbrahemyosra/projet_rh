import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import {
  ITableData,
} from 'src/app/interfaces/table.interface';
// import { VacationService } from '../../vacation/service/vacation.service';
import { UserServiceService } from "../service/user-service.service";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  isLoading = true;
  SELECTED_COMMAND!: ITableData;
  // table: ITable = this._commandService.table;
  constructor(
    private location: Location,
    public userService: UserServiceService,
    private _APP_SERVICE: AppServiceService
  ) {}

  ngOnInit(): void {
    console.log(this.userService.SELECTED_USER);
    
    // console.log(this);    
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 1500);
  }

  // btnClicked(event: { btn: IBtnConfig; index: number }) {
  //   switch (event.btn.name) {
  //     case 'Détail':
  //       this._APP_SERVICE.MODALS_NUMBER.push('command');
  //       this.SELECTED_COMMAND = this.table.data[event.index];
  //       this._commandService.isVisible = true;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // onBack() {
  //   this.location.back();
  // }
}
