import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { TypeDemandeService } from './service/type-demande.service';

@Component({
  selector: 'app-type-demande',
  templateUrl: './type-demande.component.html',
  styleUrls: ['./type-demande.component.scss']
})
export class TypeDemandeComponent implements OnInit {
  table: ITable = this.typeDemandeService.table;

  constructor(public typeDemandeService: TypeDemandeService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService) { }

  ngOnInit(): void {
    this.getAllTypes(1) 
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.typeDemandeService.SELECTED_TYPE = this.typeDemandeService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('type demande');
      this.typeDemandeService.isVisible = true; } 
    else {
      this.typeDemandeService.deleteTypeDemande(this.typeDemandeService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllTypes(1);
      })
    }
}

pageChanged(page: number) {
  this.getAllTypes(page);
}

getAllParams(page){
  this._tableService.isLoading = true;
  this.typeDemandeService.getTypeDemande({ page: page }).subscribe((res: any) => {
    
    this.typeDemandeService.table.data = res.data;
    this.typeDemandeService.total = res.total;
    this._tableService.isLoading = false;
  });
}


add() {
  this._APP_SERVICE.MODALS_NUMBER.push('type demande')
  this.typeDemandeService.isVisible = true;
}

getAllTypes(page: number): void {
  this._tableService.isLoading = true;
  this.typeDemandeService.getTypeDemande({ page: page }).subscribe((res: any) => {
    console.log(res);
    this.typeDemandeService.table.data = res;
    this.typeDemandeService.total = res.total;
    this._tableService.isLoading = false;
  });
}

submitedFilter(e) { }

}
