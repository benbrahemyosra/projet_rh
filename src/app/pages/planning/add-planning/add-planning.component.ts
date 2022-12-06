import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, enableProdMode } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanningService } from '../service/planning.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { RxwebValidators,IpVersion } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-add-planning',
  templateUrl: './add-planning.component.html',
  styleUrls: ['./add-planning.component.scss']
})
export class AddPlanningComponent implements OnInit{
  users: Array<any> = [];
  type_Planning: Array<any> = [];
  liste:  Array<any> = [];
  startValue: Date | null = null;
  endValue: Date | null = null;
  date:any;
  selectedDay:any; 
  verif=false;
  send_date;
  selectedListe=false;
  newstartdate;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

 
  constructor(
    public planningService: PlanningService,
    private fb: FormBuilder,
    private fb_private: FormBuilder,public datepipe: DatePipe) {
    this.planningService.validateForm_general = this.fb.group({
      name: ['', [Validators.required]],
      type_Planning: ['', [Validators.required]],
      description: ['', [Validators.required]],
      liste_employe: [[], [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', Validators.required],
      MinPersonne:['',RxwebValidators.maxNumber({dynamicConfig:(x,y,c)=>{
        c.value =  this.planningService.numberOfEmplo;
         return c;
       }})],
      dateProd: ['', Validators.required]
    });
    this.planningService.validateForm_tache = this.fb_private.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id_Employe: ['', Validators.required],
      end_date: ['', Validators.required],
      start_date: ['', Validators.required],
    });}

  ngOnInit(): void {
    console.log(this.selectedListe)
    this.getusers();
    this.getTypes();
       if(this.selectedListe==false){
        this.planningService.validateForm_general.controls.MinPersonne.disable();
       }
  
    if (this.planningService.SELECTED_planning) {
        this.verif=true;
        this.liste=this.planningService.SELECTED_planning.liste_employees;
        this.planningService.validateForm_general.controls.name.patchValue(
        this.planningService.SELECTED_planning.titre
      )
        this.planningService.validateForm_general.controls.type_Planning.patchValue(
        this.planningService.SELECTED_planning.type_planning)
        this.planningService.validateForm_general.controls.type_Planning.disable();
  
      this.planningService.validateForm_general.controls.description.patchValue(
        this.planningService.SELECTED_planning.description
      )
      this.planningService.validateForm_general.controls.MinPersonne.patchValue(
        this.planningService.SELECTED_planning.MinPersonne
      )
        this.planningService.validateForm_general.controls.start_date.patchValue(this.planningService.SELECTED_planning.date_debut);
        this.planningService.validateForm_general.controls.end_date.patchValue(this.planningService.SELECTED_planning.date_fin);

    }}

disabledStartDate = (startValue: Date): boolean => {
      if (!startValue || !this.endValue) {
        return false;
      }
      return startValue.getTime() > this.endValue.getTime();
    };

disabledEndDate = (endValue: Date): boolean => {
     this.send_date=new Date(this.startValue);
     this.send_date.setDate(this.send_date.getDate()-1);
      if (!endValue || !this.send_date) {
        return false;
      }
      return endValue.getTime() <= this.send_date.getTime();
    };
public disabledDateProd = (current: Date): boolean =>
 !(current.getTime() > this.planningService.validateForm_general.controls.start_date.value.getTime() && current.getTime() <  this.planningService.validateForm_general.controls.end_date.value.getTime());   
public disabledDate = (current: Date): boolean => !(current.getTime() > this.planningService.startDate.getTime() && current.getTime() < this.planningService.endDate.getTime());   
public disabledDateEnd = (current: Date): boolean => !(current.getTime() >=  this.newstartdate.getTime() && current.getTime() <=  this.planningService.endDate.getTime()); // put your logic here

    getusers(): void {
    this.planningService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
    })}

  getTypes(): void {
    this.planningService.getTypePlanning().subscribe((res: any) => {
      this.type_Planning = res.data;
    });}
 onSelect2(){
      this.newstartdate=new Date(this.planningService.validateForm_general.controls.start_date.value);
      this.startValue=this.newstartdate
      this.planningService.validateForm_general.controls.end_date.setValue(this.endValue);
}
 onSelectDateTache(){
  this.newstartdate=new Date(this.planningService.validateForm_tache.controls.start_date.value);
  console.log(this.newstartdate);
  if(this.verif==false){
    this.newstartdate.setDate(this.newstartdate.getDate()-1);
  }
  this.planningService.validateForm_tache.controls.end_date.setValue(this.planningService.endDate.getTime());
  console.log( this.planningService.startDate);

}
onSelectliste(){
  this.planningService.numberOfEmplo=this.planningService.validateForm_general.controls.liste_employe.value.length;

  if( this.planningService.numberOfEmplo > 0)
{
  this.selectedListe=true;
  console.log( this.planningService.numberOfEmplo);
  this.planningService.validateForm_general.controls.MinPersonne.enable();
  this.planningService.numberOfEmplo=this.planningService.validateForm_general.controls.liste_employe.value.length;
  console.log( this.planningService.numberOfEmplo);
}
}
selectChangeHandler (event: any) {
  //update the ui
  this.selectedDay = event.target.value;
  console.log( this.selectedDay )
}
  onSelect(e) {
    if (e == 'projet') {
      this.planningService.validateForm_general.controls.dateProd.enable();

      this.planningService.type = 10;
      this.planningService.suiv=1;
  }
      else{
          this.planningService.validateForm_general.controls.MinPersonne.disable();
          this.planningService.validateForm_general.controls.dateProd.disable();
        this.planningService.type = 0;
      }
  }
  
       
  }

 



