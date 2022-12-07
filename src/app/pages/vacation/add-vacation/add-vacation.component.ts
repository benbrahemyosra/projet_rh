import { Component, OnInit,ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter, Input} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { VacationService } from "../service/vacation.service";
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { RapportCongeService } from "src/app/pages/rapport-conge/service/rapport-conge.service";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AsyncSubject, Observable } from 'rxjs';


export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}

@Component({
  selector: "app-add-vacation",
  templateUrl: "./add-vacation.component.html",
  styleUrls: ["./add-vacation.component.scss"],
})
export class AddVacationComponent implements OnInit {
    @Output() onFileSelect: EventEmitter<Object> = new EventEmitter();
  @ViewChild('fileUpoader',{static: false}) fileUpoader: ElementRef<HTMLElement>;
  public  imageName   : string  =  '' ;

  types = [];
  startValue: Date | null = null;
  endValue: Date | null = null;
  send_date;
  inp;
  newstartdate;
  typeConge;
  uploading = false;
  fileList: NzUploadFile[] = [];
  nameFile:string;
  constructor(
    private fb: FormBuilder,
    public vacationService: VacationService,
    public rapportService:RapportCongeService ) {
    this.vacationService.validateFormAdd = this.fb.group({
      date_debut: ["", Validators.required],
      date_fin: ["", Validators.required],
      description: ["", Validators.required],
      codeTypeConge: ["", Validators.required],
      imageName: [''],

    });
  }

  ngOnInit(): void {
    console.log(this.vacationService.typeSelect)
    this.getAllTypes();
    if (this.vacationService.SELECTED_VACATION) {
      console.log(this.vacationService.SELECTED_VACATION);

      console.log(this.vacationService.SELECTED_VACATION);
      this.vacationService.validateFormAdd.controls.description.patchValue(
        this.vacationService.SELECTED_VACATION.description
      )
      this.vacationService.validateFormAdd.controls.date_debut.patchValue(
        this.vacationService.SELECTED_VACATION.date_start
      )
      this.vacationService.validateFormAdd.controls.date_fin.patchValue(
        this.vacationService.SELECTED_VACATION.date_end
      )
      this.vacationService.validateFormAdd.controls.codeTypeConge.patchValue(
        this.vacationService.SELECTED_VACATION.TypeConge
      )
      if( this.vacationService.SELECTED_VACATION.certificat!=null ){
 
          }
  }
}

  onSelect(){
    this.newstartdate=new Date( this.vacationService.validateFormAdd.controls.date_debut.value);
    this.startValue=this.newstartdate
    this.vacationService.validateFormAdd.controls.date_fin.setValue(this.endValue);
}
selectFile(event: Event) {
  const file      = (event.target as HTMLInputElement).files[0];
  console.log(file);
  this.imageName  = file.name;
  // Preview image
   if (file) {
    const reader  = new FileReader();
    reader.onload = () => {
      let image= reader.result as string;
      this.rapportService.image=image;

    } ;
    reader.readAsDataURL(file);
    this.onFileSelect.emit(file);
  }
}



  getAllTypes(): void {
    this.vacationService.getAllTypes().subscribe((res: any) => {
      this.typeConge=res.data;
      this.types = res.data.map((el: any) => ({
        name: el?.name,
        value: el?.id,
      }));

      if (this.vacationService.SELECTED_VACATION) {
        this.vacationService.validateFormAdd.controls.codeTypeConge.patchValue(
          this.vacationService.SELECTED_VACATION.TypeConge
        )
      }
    });
  }
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
  onSelectTYPE(e) {
    console.log(e)
    for( let item of this.typeConge){
         if(item.name==e){
          this.vacationService.typeSelect=item.actif;
          console.log( this.vacationService.typeSelect)
         }
    }
  
  }
}
