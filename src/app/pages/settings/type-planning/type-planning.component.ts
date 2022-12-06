import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { TypePlanningService } from './service/type-planning.service';

@Component({
  selector: 'app-type-planning',
  templateUrl: './type-planning.component.html',
  styleUrls: ['./type-planning.component.scss']
})

export class TypePlanningComponent implements OnInit {
  table: ITable = this.typePlanService.table;
  constructor(public typePlanService:TypePlanningService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,) { }

  ngOnInit(): void {
    this.getAllTypePlanning(1) 
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.typePlanService.SELECTED_PLANNING = this.typePlanService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('type planning');
      this.typePlanService.isVisible = true; } 
    else {
      this.typePlanService.deleteTypePlanning(this.typePlanService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllTypePlanning(1);
      })
    }
}

pageChanged(page: number) {
  this.getAllTypePlanning(page);
}

getAllTypePlanning(page){
  this._tableService.isLoading = true;
  this.typePlanService.getTypePlanning({ page: page }).subscribe((res: any) => {
    
    this.typePlanService.table.data = res.data;
    this.typePlanService.total = res.total;
    this._tableService.isLoading = false;
  });
}

add() {
  this._APP_SERVICE.MODALS_NUMBER.push('type planning')
  this.typePlanService.isVisible = true;
}

getAllTypes(page: number): void {
  this._tableService.isLoading = true;
  this.typePlanService.getTypePlanning({ page: page }).subscribe((res: any) => {
    this.typePlanService.table.data = res.data;
    this.typePlanService.total = res.total;
    this._tableService.isLoading = false; });
}

submitedFilter(e) { }

}
