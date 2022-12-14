import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { IBtnConfig, ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { PlanningService } from './service/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})



export class PlanningComponent implements OnInit, OnDestroy  {
  expand:boolean =false
  table: ITable = this.planningService.table;
  filter: IFilter = this.planningService.filter;
  listPlanning;
  constructor(
    public planningService: PlanningService,
    private _tableService: TableServiceService,
    public _APP_SERVICE: AppServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('role'))
    this.getAllUSers()
    this.getAllplanning(1);
    this.getTypes();
  }  

  submitedFilter(form: any) {
    if(form.date_debut==null ){
      form.date_debut="";
   }
    if(form.date_debut!="" ){
    form.date_debut = moment(form.date_debut).format("YYYY-MM-DD");
   }

   if( form.date_fin==null ){
    form.date_fin="";
   }
   if(form.date_fin!="" ){
    form.date_fin = moment(form.date_fin).format("YYYY-MM-DD");
   } 
   console.log(form)  
    this._tableService.isLoading = true;
    setTimeout(() => {
      this.planningService.getPlanningByQuery(form).subscribe((res:any)=>{
        console.log(res)
        if(Object){
          this.listPlanning= Object.values(res);
          console.log(this.listPlanning);
        }else{
          this.listPlanning=res;
        }
        if( this.planningService.Tvisiblity.length!==0){
          this.planningService.clearArray(this.planningService.Tvisiblity);
            }
        for (let item of this.listPlanning) {
          item.expand=false; 
          if(item.type_planning=='projet'){
            this.planningService.Tvisiblity.push(true)
          }else{
            this.planningService.Tvisiblity.push(false)
           }
  
          item.liste_employees = JSON.parse(item.liste_employees)
          item.liste_employees.forEach((value, index, array) => {
            array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
            , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
          }  
          })
  
        }
  
        this.planningService.table.data=this.listPlanning
      })
      this._tableService.isLoading = false;
    }, 1500);
  }

  btnClicked(event: { btn: IBtnConfig; index: number }) {
    switch (event.btn.name) {
      case 'Ajouter Tâche':
        this.planningService.isVisible = true;
        this._tableService.index=event.index;
        this._APP_SERVICE.MODALS_NUMBER.push('tache');
        this.planningService.typecode = 10;
        this.planningService.startDate=this.planningService.table.data[event.index].date_debut;
        this.planningService.endDate=this.planningService.table.data[event.index].date_fin;
        this.planningService.idPlanning=this.planningService.table.data[event.index].id;
        this.planningService.liste_employees=this.planningService.table.data[event.index].liste_employees;
        break;
        case 'Supprimer':
          this.deleteplanning(this.planningService.table.data[event.index].id as number);
        break;
        case 'Modifier':
          this.planningService.isVisible = true;
          this.planningService.btnClicked='Modifier'
          this.planningService.SELECTED_planning= this.planningService.table.data[event.index];
          this._APP_SERVICE.MODALS_NUMBER.push('planning');
          break;
      default:
        break;
    }
  }

  add(){
    this._APP_SERVICE.MODALS_NUMBER.push('planning');
    console.log(this._APP_SERVICE.MODALS_NUMBER)
    this.planningService.isVisible = true;
  }


  getTypes(): void {
    this.planningService.getTypePlanning().subscribe((res: any) => {
      this.planningService.filter.filters.forEach((value, index, array) => {
        for(let item of res.data){
          item.value=item.name;
        } 
        value.select_data=res.data
    }) 
  })
}
  getAllUSers(): void {
    this._tableService.isLoading = true;
    this.planningService.getAllUsers().subscribe((res) => {
      this.planningService.table.data = res.data;
      this.planningService.total = res.total;
      this._tableService.isLoading = false;

    })
  }
  getAllplanning(page: number): void{
    console.log(this.planningService.table.header.length)
    if( (localStorage.getItem('role') !=='admin') && (this.planningService.table.header.length==5) ){
      this.planningService.table.header.splice(this.planningService.table.header.length-1,1);
      }
      this._tableService.isLoading = true;
      this.planningService.getAllplanning({ page: page }).subscribe((res:any)=>{
      if( this.planningService.Tvisiblity.length!==0){
        this.planningService.clearArray(this.planningService.Tvisiblity);
          }
      for (let item of res.data) {
        item.expand=false;
     
        if(item.type_planning=='projet'){
          this.planningService.Tvisiblity.push(true)
        }else{
          this.planningService.Tvisiblity.push(false)
         }

        item.liste_employees = JSON.parse(item.liste_employees)
        item.liste_employees.forEach((value, index, array) => {
          array[index] ={"id":value.id,"email":value.email, "password":value.password,"first_name":value.first_name, "last_name":value.last_name,"departement":value.departement ,"role":value.role, "adress":value.adress, "city":value.city,"birth_date":value.birth_date
          , "phoneHome":value.phoneHome, "phonePro":value.phonePro, "poste_id":value.poste_id, "type_employee":value.type_employee,"date_arrive":value.date_arrive
        }  
        })

      }
      this.planningService.table.data = res.data;
      console.log( this.planningService.table.data );
      this.planningService.total = res.total;
      this._tableService.isLoading = false;
    })

  }
  ngOnDestroy() {
    if( this.planningService.Tvisiblity.length!==0){
      this.planningService.clearArray(this.planningService.Tvisiblity);
 }
}

  pageChanged(page: number): void {
    this.getAllplanning(page)
    }

  deleteplanning(id: number) {
    this._tableService.isLoading = true;
    this.planningService.deleteplanning(id).subscribe((res: any) => {
      this.getAllplanning(1);
    });
  }
}