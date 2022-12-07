import { Component, OnInit } from '@angular/core';
import { VacationService } from './service/vacation.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { AppServiceService } from 'src/app/app-service.service';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { RapportCongeService } from 'src/app/pages/rapport-conge/service/rapport-conge.service';

import {
  IBtnConfig,
  ITable,
  ITableData,
} from 'src/app/interfaces/table.interface';
import { NgForm } from '@angular/forms';
import { TypesService } from '../settings/types-vacation/service/types.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
  radioValue = 'A';
  SELECTED_COMMAND!: ITableData;
  table: ITable = this.vacationService.table;
  filter: IFilter = this.vacationService.filters;
  array=[];
 status: Array<{ value: string, name: string }> = [
    { value:"accept" , name: "accept" },
    { value:"attente" , name: "attente" },
    { value:"refus" , name: "refus" },

  ]
  constructor(
    public vacationService: VacationService,
    public _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,
    public typeService: TypesService,
    public rapportService:RapportCongeService 

  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('role')=='admin' ||  this.radioValue == 'A'){
    this.getAllVactions(1);}
    else{
       this.getVacationById(1);
    }
    this.gettypeConge();
    this.vacationService.filters.filters[1].select_data=this.status;

  }

  submitedFilter(form: NgForm) {
    this._tableService.isLoading = true;
    setTimeout(() => {
      this.vacationService.getVacationByQuery( form).subscribe((res:any)=>{
        console.log(res)
        this.vacationService.table.data=res
      })
      this._tableService.isLoading = false;
    }, 1500);
    console.log(form);
  }
    getVacationById(page:number ){
      this._tableService.isLoading = true;
      this.vacationService.getVacationById(localStorage.getItem('iduser'),{page:page}).subscribe((res: any) => {
       if( this.vacationService.Tvisiblity.length!==0){
        this.vacationService.clearArray( this.vacationService.Tvisiblity);
          }
      for (let item of res.data) {
        if(item.code_typeC=='1'){
          this.vacationService.Tvisiblity.push(true)
        }else{
          this.vacationService.Tvisiblity.push(false)
         }
        }
          console.log( this.vacationService.Tvisiblity);
      this.vacationService.total = res.total;
      this.vacationService.table.data = res.data;
      if( this.vacationService.table.header.length==7){
      this.vacationService.table.header.splice(0,1);
      }
        this._tableService.isLoading = false;
  
  
      })    }
  btnClicked(event: { btn: IBtnConfig; index: number }) {
    if(event.btn.name=='Détail') {
        this.rapportService.SELECTED_RAPPORT = this.table.data[event.index];
        this.vacationService.getVacationByIDVacation(this.rapportService.SELECTED_RAPPORT.id).subscribe((res: any) => {
          this.rapportService.detail=true;
          this.rapportService.rapport=res;
          if(res.updateComment != null ){
            this.rapportService.rapport.reponse=res.updateComment;
          }
          this._APP_SERVICE.MODALS_NUMBER.push('detail-rapport');
        this.rapportService.isVisible = true;
        })
       
    }else if(event.btn.name=='Télécharger Certificat'){

        console.log(this.table.data[event.index].certificat)
        const downloadLink = document.createElement('a');
        const fileName = 'certificat.pdf';
        downloadLink.href =this.table.data[event.index].certificat ;
        downloadLink.download = fileName;
        downloadLink.click();
    }else{
      this.vacationService.isVisible = true;
      console.log(this.table.data[event.index]);
      this.vacationService.SELECTED_VACATION= this.table.data[event.index];
      this._APP_SERVICE.MODALS_NUMBER.push('vacation');
    }
  }

  add() {
    if(this.rapportService.detail==true ){
      this.rapportService.detail=false;
    }
    if(this.vacationService.SELECTED_VACATION!=null){
      this.vacationService.SELECTED_VACATION=null;
    }
    this._APP_SERVICE.MODALS_NUMBER.push('vacation');
    this.vacationService.isVisible = true;
  }
  showRpport(){
    this._APP_SERVICE.MODALS_NUMBER.push('detail-rapport');
    console.log( this._APP_SERVICE.MODALS_NUMBER)
    this.rapportService.isVisible = true;
  }
  getAllVactions(page: number): void {
    if (this.vacationService.table.header.length<7){
      this.array= this.vacationService.table.header;
      this.vacationService.table.header.splice(0, 0, {
        name: 'Employe',
        sortFn: (a: ITableData, b: ITableData) =>
          (a.status as string).localeCompare(b.status as string),
          sortDirections: ['ascend', 'descend', null],
        visible:  true 

      });
    }
    this._tableService.isLoading = true;
    this.vacationService.getAllVacations({ page: page }).subscribe((res: any) => {
      if( this.vacationService.Tvisiblity.length!==0){
        this.vacationService.clearArray( this.vacationService.Tvisiblity);
          }
      for (let item of res.data) {
        if(item.code_typeC=='1'){
          this.vacationService.Tvisiblity.push(true)
        }else{
          this.vacationService.Tvisiblity.push(false)
         }
        }
      this.vacationService.total = res.total;
      this.vacationService.table.data = res.data;
      console.log(  this.vacationService.table.data)
      this._tableService.isLoading = false;


    })
  }
gettypeConge(){
  this.typeService.getTypes({page:1}).subscribe(res=>{
    console.log(res)
    for(let item of res.data){
      item.value=item.name;
    }
    this.vacationService.filters.filters[2].select_data=res.data
  
          
    console.log( this.vacationService.filters.filters)

  })
}
  pageChanged(page: number): void {
    if( this.radioValue == 'A'){
      this.getAllVactions(page)

    }else{
      this.getVacationById(page)
    }

  }
  getAll(e){
    this.getAllVactions(1);
  }
  getbyid(){
    this.getVacationById(1);

  }
}
