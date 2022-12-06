import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { ParamSocieteService } from '../param-societe/service/param-societe.service';
import { TypeEmployeeService } from './service/type-employee.service';

@Component({
  selector: 'app-type-employee',
  templateUrl: './type-employee.component.html',
  styleUrls: ['./type-employee.component.scss']
})
export class TypeEmployeeComponent implements OnInit {
  table: ITable = this.empService.table;
  filter: IFilter = this.empService.filters;

  constructor(public empService: TypeEmployeeService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,) { }

  ngOnInit(): void {
    this.getAllParams(1) 
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.empService.SELECTED_EMP = this.empService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('type employee');
      this.empService.isVisible = true; } 
    else {
      this.empService.deleteTypeEmployee(this.empService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllParams(1);
      })
    }
}

pageChanged(page: number) {
  this.getAllParams(page);
}

getAllParams(page){
  this._tableService.isLoading = true;
  this.empService.getTypeEmployee({ page: page }).subscribe((res: any) => {
    this.empService.table.data = res;
    this.empService.total = res.total;
    this._tableService.isLoading = false;
  });
}
add() {
  this._APP_SERVICE.MODALS_NUMBER.push('type employee')
  this.empService.isVisible = true;
}

getAllTypes(page: number): void {
  this._tableService.isLoading = true;
  this.empService.getTypeEmployee({ page: page }).subscribe((res: any) => {
    this.empService.table.data = res;
    this.empService.total = res.total;
    this._tableService.isLoading = false;
  });
}
submitedFilter(e) { }

}
