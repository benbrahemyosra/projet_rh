import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild ,OnDestroy,EventEmitter,Output} from '@angular/core';
import { DemandsService } from 'src/app/pages/demands/service/demands.service';
import { PointageService } from './service/pointage.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';
import { DatePipe } from '@angular/common';
import { LoginService } from '../login/service/login.service';
import Swal from 'sweetalert2';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';
import * as moment from 'moment';
import { TimerService } from "src/app//timer.service";
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent implements OnInit {
  @ViewChild('basicTimer', { static:false}) basicTimer: CdTimerComponent;
  @Output() onComplete: EventEmitter<CdTimerComponent> = new EventEmitter();

  //table1 : ITable = this.demandsService.table ; 
  //filter1 : IFilter = this.demandsService.filters;
  clickedstart;
  radioValue = 'A';
  clickedPause;
  clickedEndPause;
  clickedendOfDay;
  DataStart:any;
  table : ITable= this.pointageService.table ;
  filter : IFilter ;
  idPointage:number;
  str:string;
  data:any;
  nbHeure:any
  position;
  verif=true;
  form:any;
  constructor(public pointageService : PointageService,
    private _tableService: TableServiceService,
    public datepipe: DatePipe,
    public loginService: LoginService,
    public _APP_SERVICE: AppServiceService,
    public timerService: TimerService)  {}

  ngOnInit(): void {  
    if(  this.pointageService.verif){
      this.basicTimer= this.pointageService.heure;
    }
     this.disabledButton();
    this.table= this.pointageService.table; 
    this.filter = this.pointageService.filters ;
    if(localStorage.getItem('role')=='employee'){
    this.getTimePointOFuser({ page: 1 });
    }else{
       this.getAllDatePointage({ page: 1 })
    }
  }

  submitedFilter(form:any,page:number): void { 
    if(form.date=="" && form.name==""){
      this.verif=false;
    }
    console.log(form);
    if(form.date==null){
      form.date="";
    }
    if(form.date!=""){
      form.date = moment(form.date).format("YYYY-MM-DD");
    }
    form.page=page;
    this._tableService.isLoading = true;
    this.form=form;
    setTimeout(() => {
      this.pointageService.getPointageByQuery( form).subscribe((res:any)=>{
        if(form.date!= ""){
          let b = Object.values(res);
          console.log(b);
          this.pointageService.table.data= b
          if(b.length<5){
            this.pointageService.total=1;
          }else{
            this.pointageService.total=b.length;
          }}
          else{
            this.pointageService.table.data=res.data
            this.pointageService.total=res.total
          }
        console.log(res)
       
      })
      this._tableService.isLoading = false;
    }, 1500);
  }

   Addstartday()
   {
    let currentDateTime =this.datepipe.transform((new Date), 'YYYY-MM-dd h:mm:ss');
    this.DataStart={
      date:currentDateTime,
      id:localStorage.getItem('iduser')
    }
   this.pointageService.AddDateStart(this.DataStart).subscribe((res:any)=>{
    console.log(res);
    localStorage.setItem('idPointage', res.id as string);
    if(res==true){
    Swal.fire({
      title: 'OPS!',
      text: 'vous pouvez pas pointer deux fois dans le même jour' ,
      icon: 'info',
      confirmButtonColor: '#1890ff',
      confirmButtonText: 'Ok',
    })
   }else{
    this.timerService.startTimer();
    this.clickedstart=true 
    this.clickedPause=false
    this.clickedendOfDay=false;
    this.disabledButton();
    this.getTimePointOFuser({ page: 1 });
   }
   })
  }
AddPausse(str){
  this.radioValue='B';
  switch(str){
   case "clickedPause":
    this.timerService.pauseTimer();
    this.clickedPause=true;
    this.clickedEndPause=false;
    this.str="clickedPause";
    break;
   case "clickedEndPause":
    this.timerService.startTimer();
    this.clickedEndPause=true;
    this.clickedendOfDay=false;
    this.clickedPause=false
    this.str="clickedEndPause";
    break;
   case "clickedEnd":
      Swal.fire({
        title: 'vous êtes sûre?',
        text: 'que vous voulez quitter ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#1890ff',
        cancelButtonColor: '#0a0a0a',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
      this.timerService.pauseTimer();
      this.nbHeure=(this.timerService.fetchDisplay().substr(0,this.timerService.fetchDisplay().indexOf(':')));
      this.clickedendOfDay=true;
      this.clickedstart=false;
      this.clickedPause=true;
      this.str="clickedEndDay";
      let date =this.datepipe.transform((new Date), 'YYYY-MM-dd h:mm:ss');
      this.pointageService.AddDatePause(date, localStorage.getItem('idPointage'),this.str,this.nbHeure as number).subscribe(res=>
      {this.getTimePointOFuser({ page: 1 });
      this.disabledButton();

      })
        }
      });
      break;
  }
  if(str!="clickedEnd"){
    let date =this.datepipe.transform((new Date), 'YYYY-MM-dd h:mm:ss');
    this.pointageService.AddDatePause(date,localStorage.getItem('idPointage'),this.str,this.nbHeure).subscribe(res=>{
      this.disabledButton();
      this.getTimePointOFuser({ page: 1 });

    })
  }
  }
 
  getTimePointOFuser(data): void {
    this._tableService.isLoading = true;
    this.pointageService.getDatePointageofUser(data,localStorage.getItem('iduser')).subscribe((res: any) => {
      if( this.pointageService.table.header.length==7){
        this.pointageService.table.header.splice(0,1);
        }
    this.pointageService.table.data = res.data;
    this.pointageService.total=res.total;
    this._tableService.isLoading = false;
    })
  }
  getAllDatePointage(data): void {
    this._tableService.isLoading = true;
    console.log( this.pointageService.table.header)
    this.pointageService.getAllDatePointage(data).subscribe((res: any) => {
      console.log(res)
    this.pointageService.table.data = res.data;
    this.pointageService.total=res.total;
    this._tableService.isLoading = false;
    })
  }
  pageChanged(page: number): void {
    console.log(page);
    if( this.radioValue == 'A'){
      if(this.verif==false){
        this.form.page=page;
          this.pointageService.getPointageByQuery(this.form).subscribe((res:any)=>{
                this.pointageService.table.data=res.data
                this.pointageService.total=res.total
                if(page ==  this.pointageService.total){
                       this.verif=true;
                }
              })   
            }else{
              this.getAllDatePointage(page)
            }  
    }else{
      this.getTimePointOFuser(page)
    }
  }
  disabledButton(){
    this.pointageService.getPosition(localStorage.getItem('iduser')).subscribe(res=>{
      this.position=res
      console.log(this.position) 
      if(this.position.length!=0){
     switch (this.position[0].position) {
       case "2":
        console.log(this.position[0].position);
         this.clickedstart=true;
         this.clickedEndPause=true;
         this.clickedPause=false;
         this.clickedendOfDay=false;
         break;
       case "3":
        console.log(this.position[0].position);
         this.clickedstart=true;
         this.clickedPause=true;
         this.clickedEndPause=false
         this.clickedendOfDay=false;
           break;
       case "4":
        console.log(this.position[0].position);
             this.clickedstart=true;
             this.clickedPause=true;
             this.clickedEndPause=true;
             this.clickedendOfDay=false;
           break;
           case "5":
            console.log(this.position[0].position);
                 this.clickedstart=true;
                 this.clickedPause=true;
                 this.clickedEndPause=true;
                 this.clickedendOfDay=true;
               break;
       default:
        console.log(this.position[0].position);
         this.clickedstart=false;
         this.clickedPause=true;
         this.clickedEndPause=true;
         this.clickedendOfDay=true;
         break;
     }}else{
      this.clickedstart=false;
      this.clickedPause=true;
      this.clickedEndPause=true;
      this.clickedendOfDay=true;
     }
    
  })
  }


}
