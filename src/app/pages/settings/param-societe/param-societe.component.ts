import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { ParamSocieteService } from './service/param-societe.service';

@Component({
  selector: 'app-param-societe',
  templateUrl: './param-societe.component.html',
  styleUrls: ['./param-societe.component.scss']
})
export class ParamSocieteComponent implements OnInit {
  table: ITable = this.paramsService.table;
  filter: IFilter = this.paramsService.filters;

  constructor(public paramsService: ParamSocieteService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,) { }

  ngOnInit(): void {
    this.getAllParams(1) 
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.paramsService.SELECTED_PARAMS = this.paramsService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('parametre');
      this.paramsService.isVisible = true; } 
    else {
      this.paramsService.deleteParams(this.paramsService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllParams(1);
      })
    }
}

pageChanged(page: number) {
  this.getAllParams(page);
}

getAllParams(page){
  this._tableService.isLoading = true;
  this.paramsService.getParams({ page: page }).subscribe((res: any) => {
    
    this.paramsService.table.data = res.data;
    this.paramsService.total = res.total;
    this._tableService.isLoading = false;
  });
}

add()
{
  this._APP_SERVICE.MODALS_NUMBER.push('parametre')
  this.paramsService.isVisible = true;
}

getAllTypes(page: number): void {
  this._tableService.isLoading = true;
  this.paramsService.getParams({ page: page }).subscribe((res: any) => {
  this.paramsService.table.data = res.data;
  this.paramsService.total = res.total;
  this._tableService.isLoading = false;
  });
}

submitedFilter(e) { }

}
