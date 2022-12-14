import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IModalConfig } from 'src/app/interfaces/modal.interface';
import { ChefsServiceService } from 'src/app/pages/chefs/service/chefs-service.service';
import { CommandServiceService } from 'src/app/pages/commands/service/command-service.service';
import { OptionServiceService } from 'src/app/pages/options/service/option-service.service';
import { VacationService } from 'src/app/pages/vacation/service/vacation.service';
import { MeetingService } from 'src/app/pages/meeting/service/meeting.service';
import { TrainingService } from 'src/app/pages/training/service/training.service';
import { UserServiceService } from 'src/app/pages/users/service/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
import { PlanningService } from 'src/app/pages/planning/service/planning.service';
import * as moment from 'moment';
import { TableServiceService } from '../table/service/table-service.service';
import { RapportCongeService } from "src/app/pages/rapport-conge/service/rapport-conge.service";

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss'],
})
export class GeneralModalComponent implements OnInit {
  @Input('CONFIG') CONFIG: IModalConfig;
  @Output() handleOk = new EventEmitter<IModalConfig>();
  @Output() handleCancel = new EventEmitter<IModalConfig>();
  @Output() submitCommand = new EventEmitter<{
    form: NgForm;

    config: IModalConfig;

  }>();
  constructor(
    public _optionService: OptionServiceService,
    public _commandService: CommandServiceService,
    public _chefService: ChefsServiceService,
    public _vacationService: VacationService,
    public _trainingService: TrainingService,
    public _meetingService: MeetingService,
    public userSercvice: UserServiceService,
    public _appService: AppServiceService,
    public planningService: PlanningService,
    public tableService: TableServiceService,
    public rapportService:RapportCongeService




  ) { }

  ngOnInit(): void {  
  }
  submit(form: NgForm) {
    this.submitCommand.emit({ form, config: this.CONFIG });
  }

  next() { 
    if(this.planningService.type==10 && this.planningService.idPlanning==undefined){
      this.planningService.typecode=10;
      this.planningService.suivant=false;
      this.planningService.posttache=true;
      let start_date =
      (this.planningService.validateForm_general.value.start_date = moment(
        this.planningService.validateForm_general.value.start_date 
      ).format("YYYY-MM-DD" ));

    let end_date= (this.planningService.validateForm_general.value.end_date =
      moment(this.planningService.validateForm_general.value.end_date).format(
        "YYYY-MM-DD"
      ));
      let dateProd = (this.planningService.validateForm_general.value.dateProd =
        moment(this.planningService.validateForm_general.value.dateProd).format(
          "YYYY-MM-DD"
        ));
        console.log(dateProd)
    delete this.planningService.validateForm_general.value.start_date;
    delete this.planningService.validateForm_general.value.dateProd;
    delete this.planningService.validateForm_general.value.start_date;

    let form = {
      ...this.planningService.validateForm_general?.value,
      start_date,
      end_date,
      dateProd ,

    };
        
   this.planningService.startDate=new Date(start_date);
   this.planningService.startDate.setDate( this.planningService.startDate.getDate()-1)
   this.planningService.endDate=new Date(end_date);
    this.planningService.addPlanning(form).subscribe((res: any) => {
      this.planningService.idPlanning=res.id;
      this.planningService.liste_employees=JSON.parse(res.liste_employees)
      if( this.planningService.Tvisiblity.length!==0){
        this.planningService.clearArray(this.planningService.Tvisiblity);
   }
      this.planningService.getAllplanning(1).subscribe((res: any) => {
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
        this.planningService.total = res.total;
        this.tableService.isLoading = false;

      });
    });
    }else if(this.planningService.type==10 && this.planningService.idPlanning!=undefined){
      let start_date =
      (this.planningService.validateForm_general.value.start_date = moment(
        this.planningService.validateForm_general.value.start_date 
      ).format("YYYY-MM-DD" ));

    let end_date= (this.planningService.validateForm_general.value.end_date =
      moment(this.planningService.validateForm_general.value.end_date).format(
        "YYYY-MM-DD"
      ));
      let dateProd = (this.planningService.validateForm_general.value.dateProd =
        moment(this.planningService.validateForm_general.value.dateProd).format(
          "YYYY-MM-DD"
        ));
        console.log(dateProd)
    delete this.planningService.validateForm_general.value.start_date;
    delete this.planningService.validateForm_general.value.dateProd;
    delete this.planningService.validateForm_general.value.start_date;

    let form = {
      ...this.planningService.validateForm_general?.value,
      start_date,
      end_date,
      dateProd ,

    };
        
   this.planningService.startDate=new Date(start_date);
   this.planningService.startDate.setDate( this.planningService.startDate.getDate()-1)
   this.planningService.endDate=new Date(end_date);
   this.planningService.updataplanning(this.planningService.SELECTED_planning.id, form)
          .subscribe((res: any) => {
            if( this.planningService.Tvisiblity.length!==0){
              this.planningService.clearArray(this.planningService.Tvisiblity);
         }
            this.planningService.getAllplanning(1).subscribe((res: any) => {
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
              this.planningService.total = res.total;
              this.tableService.isLoading = false;
            });
          });
      this.planningService.typecode=10;
      this.planningService.suivant=false;
      this.planningService.posttache=true;
    }
    if(this.planningService.suivant==true){
      this.userSercvice.current++;
      }
   
  }

  pre() {
    if(this.planningService.type==10){
      this.planningService.typecode=0;
      this.planningService.suivant=true;
      this.planningService.posttache=false;

    }
    if(this.userSercvice.current>0){
      this.userSercvice.current--;
      }
  }
}
