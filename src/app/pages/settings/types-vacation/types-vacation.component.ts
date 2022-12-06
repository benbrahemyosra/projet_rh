import { Component, OnInit } from '@angular/core';
import { TypesService } from "./service/types.service";
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { IBtnConfig, ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';

@Component({
  selector: 'app-types-vacation',
  templateUrl: './types-vacation.component.html',
  styleUrls: ['./types-vacation.component.scss']
})
export class TypesVacationComponent implements OnInit {

  table: ITable = this.typeService.table;
  constructor(
    public typeService: TypesService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,
  ) { }

  ngOnInit(): void {
    this.getAllTypes(1)
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.typeService.SELECTED_TYPE = this.typeService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('type conge');
      this.typeService.isVisible = true; } 
    else {
      this.typeService.deleteTypes(this.typeService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllTypes(1);
      })
    } 
  }
  pageChanged(page: number) {
    this.getAllTypes(page);
  }



  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('type conge')
    this.typeService.isVisible = true;
  }

  getAllTypes(page: number): void {
    this._tableService.isLoading = true;
    this.typeService.getTypes({page:page}).subscribe((res: any) => {
      console.log(res);
      this.typeService.table.data = res.data;
      this.typeService.total = res.total;
      this._tableService.isLoading = false;
    });
  }

  submitedFilter(e) { }


}
