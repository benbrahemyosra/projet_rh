import { Component, OnInit } from '@angular/core';
import { DemandsService } from './service/demands.service';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { IBtnConfig, ITable } from 'src/app/interfaces/table.interface';
import { AppServiceService } from 'src/app/app-service.service';
import { NgForm } from '@angular/forms';
import { RapportCongeService } from 'src/app/pages/rapport-conge/service/rapport-conge.service';
import * as moment from 'moment';
import { VacationService } from "src/app/pages/vacation/service/vacation.service";

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.scss']
})
export class DemandsComponent implements OnInit {
 //table: ITable = this.demandsService.table;
 table: ITable;
  filter: IFilter;
form;
  constructor(
    public demandsService: DemandsService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,
    public rapportService:RapportCongeService ,
    public vacationService: VacationService,

    ) { }

  ngOnInit(): void {
    this.table= this.demandsService.table; 
    this.filter = this.demandsService.filters ;
    this.getAllDemands(1);
  }
 
  getAllDemands(page: number): void {
    this.demandsService.getDemandsBystatus({ page: page }).subscribe((res: any) => {
      console.log(res)
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
      this.demandsService.table.data = res.data ;
      this.demandsService.total = res.total ;
    })
  } 
  submitedFilter(form: any,page:number) {
    form.page=page;
    this._tableService.isLoading = true;
    if( form.date==null){
      form.date="";
    }
    if(form.date!=""){
      form.date = moment(form.date).format("YYYY-MM-DD");

    }
    this.form=form;
    setTimeout(() => {
      this.demandsService.getDemandeByQuery(form).subscribe((res:any)=>{
        console.log(res)
        if(form.date){
            let b = Object.values(res);
            console.log(b);
            this.demandsService.table.data= b
            if(b.length<5){
              this.demandsService.total=1;
            }
       }else{
        this.demandsService.table.data=res.data
        this.demandsService.total = res.total ;
       }
      })
      this._tableService.isLoading = false;
    }, 1500);
    console.log(form);
  }

  pageChanged(page: number): void {
    if(this.form.date!="" || this.form.name!=""){
      this.form.page=page;
        this.demandsService.getDemandeByQuery(this.form).subscribe((res:any)=>{
          console.log(res)
          this.demandsService.table.data=res.data
          this.demandsService.total = res.total ;
        }) 
      }else{
      this.getAllDemands(page)
    }
  }
  add(): void { 
    this._APP_SERVICE.MODALS_NUMBER.push('demande');
    console.log(this._APP_SERVICE.MODALS_NUMBER)
    this.demandsService.isVisible = true;
  }

  btnClicked(event: { btn: IBtnConfig; index: number }) {
    switch (event.btn.name) {    
    case'Accepter':
    if(          this.rapportService.detail==true ){
      this.rapportService.detail=false;

    }
    this.vacationService.SELECTED_VACATION = this.table.data[event.index];
      this.demandsService.SELECTED_DEMAND = this.table.data[event.index];
      this.demandsService.isVisible = true;
      this._APP_SERVICE.MODALS_NUMBER.push('accept');
    break;

    case 'Refuser':
      if(          this.rapportService.detail==true ){
        this.rapportService.detail=false;
  
      }
      this.vacationService.SELECTED_VACATION = this.table.data[event.index];
      this.demandsService.SELECTED_DEMAND = this.table.data[event.index];
      this.demandsService.isVisible = true;
      this.demandsService.demanrefusClicked=true;
      this._APP_SERVICE.MODALS_NUMBER.push('accept');
      break;
     
      case 'Détail':
        this.demandsService.SELECTED_DEMAND = this.table.data[event.index];
        this.vacationService.getVacationByIDVacation( this.demandsService.SELECTED_DEMAND.id).subscribe((res: any) => {
          this.rapportService.detail=true;
          this.rapportService.rapport=res;
          this._APP_SERVICE.MODALS_NUMBER.push('detail-rapport');
        this.rapportService.isVisible = true;
        })
        break;
      case 'Télécharger Certificat':
        console.log(this.table.data[event.index].certificat)
        const downloadLink = document.createElement('a');
        const fileName = 'sample.pdf';
        downloadLink.href =this.table.data[event.index].certificat ;
        downloadLink.download = fileName;
        downloadLink.click();
        break;
        default:
        break;

   }
  }
  

}
