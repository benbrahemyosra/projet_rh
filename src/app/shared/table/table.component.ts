import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {IBtnConfig, ITable,ITableData} from 'src/app/interfaces/table.interface';
import { TableServiceService } from './service/table-service.service';
import { PlanningService } from 'src/app/pages/planning/service/planning.service';
import { AppServiceService } from 'src/app/app-service.service';
import { RapportCongeService } from "src/app/pages/rapport-conge/service/rapport-conge.service";
import { VacationService } from "src/app/pages/vacation/service/vacation.service";

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table!: ITable;
  @Input() currentTable!: string;
  @Input() total!: number;
  @Input() page!: number;
  @Output() btnClicked = new EventEmitter<any>();
  @Output() pageChangedEvent = new EventEmitter<number>();
  expandSet = false;
  isVisible=false


  constructor(public _service: TableServiceService,
    public _router: Router,
    public _APP_SERVICE: AppServiceService,
    public rapportService:RapportCongeService ,
    public vactionService: VacationService,
    public planningService: PlanningService) { }

  ngOnInit(): void {
    this.total;
   
   }

  keys(obj: ITableData) {
    return Object.keys(obj);
  }

  onExpandChange(data, checked: boolean): void {
    if (checked) {
      this.expandSet=true;
    } else {
      this.expandSet=false;

    }
  }
  checked(data,i){
    if(      this.planningService.add==true)  {
      this.planningService.add=false

    }
    this.planningService.liste_employees=data.liste_employees;
    this.planningService.startDate=data.date_debut;
    this.planningService.endDate=data.date_fin;
    console.log(this.planningService.liste_employees)
    this._service.index=i


  }
  btnClicked1(item ,data,e:any) {  
    if (item.name === 'Modifier') {
      console.log(this.planningService.startDate) 
      console.log(this.planningService.endDate)      
      this.planningService.SELECTED_planning = data;
      this._APP_SERVICE.MODALS_NUMBER.push('tache');
      this.planningService.posttache == true;
      this.planningService.isVisible = true;
      this.planningService.idtache=data.id
      this.planningService.employe=this.planningService.SELECTED_planning.id_employee;

      //this.onSelect(data) 
    } else {
      console.log(data.id_planning);
      this.planningService.deletetache(data.id ).subscribe((res: any) => {
        this._service.isLoading = true;
        this.planningService.getTache(data.id_planning ).subscribe((res:any)=>{
          this._service.listeTache.data=res;
          this._service.isLoading = false;

         })
      })
    }
  }
  onCurrentPageDataChange(event: any) {
    this.pageChangedEvent.emit(event)
  }

  clickedBtn(item: IBtnConfig, index: number) {
    this.btnClicked.emit({ btn: item, index });
  }

  getSRC(src: string | boolean | number) {
    return src as string;
  }

 onSelect(data) { 
     this.planningService.getTache(data.id).subscribe((res:any)=>{
      this._service.listeTache.data=res;
     })
  }
}
