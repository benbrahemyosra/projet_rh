import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../service/planning.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.scss']
})
export class AddTacheComponent implements OnInit {
  liste:  Array<any> = [];
  position:number;
  newstartdate;
  verif=false;
  constructor(public planningService: PlanningService,private fb_private: FormBuilder) { 
      this.planningService.validateForm_tache = this.fb_private.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id_Employe: ['', Validators.required],
      end_date: ['', Validators.required],
      start_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.planningService.add)
   if(this.verif==false && this.planningService.add==false){
    this.planningService.startDate=new Date(this.planningService.startDate);
    this.planningService.startDate.setDate( this.planningService.startDate.getDate()-1)
    console.log( this.planningService.startDate)
    this.planningService.endDate=new Date(this.planningService.endDate);
    this.planningService.add=true;
   } else{
    console.log(this.planningService.startDate);
    this.planningService.startDate=new Date(this.planningService.startDate);
    this.planningService.endDate=new Date(this.planningService.endDate);

   }
   console.log(this.planningService.startDate)
  
    if(this.planningService.SELECTED_planning!=undefined){
      this.verif=true;
      this.planningService.idPlanning =this.planningService.SELECTED_planning.id_planning;
      console.log(this.planningService.employe);
      this.planningService.validateForm_tache.controls.titre.patchValue(this.planningService.SELECTED_planning.titre);
      this.planningService.validateForm_tache.controls.description.patchValue(
        this.planningService.SELECTED_planning.description
      )
      this.planningService.validateForm_tache.controls.start_date.patchValue(
        this.planningService.SELECTED_planning.date_debut)
        this.planningService.validateForm_tache.controls.id_Employe.patchValue(
          this.planningService.employe);
      this.planningService.validateForm_tache.controls.end_date.patchValue(
      this.planningService.SELECTED_planning.date_fin)
      
    }
  
  }
  public disabledDate = (current: Date): boolean => !(current.getTime() >= this.planningService.startDate.getTime() && current.getTime() <=  this.planningService.endDate.getTime()); // put your logic here
  public disabledDateEnd = (current: Date): boolean => !(current.getTime() >=  this.newstartdate.getTime() && current.getTime() <=  this.planningService.endDate.getTime()); // put your logic here

  onSelect($event){
    this.newstartdate=new Date(this.planningService.validateForm_tache.controls.start_date.value);
    console.log(this.planningService.add)
    if(this.verif==false && this.planningService.add==false){
      this.newstartdate.setDate(this.newstartdate.getDate()-1);
      this.planningService.add=true;
    }
    this.planningService.validateForm_tache.controls.end_date.setValue(this.planningService.endDate.getTime());
    console.log( this.planningService.startDate);
  }
}
