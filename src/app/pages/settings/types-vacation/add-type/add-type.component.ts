import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TypesService } from "../service/types.service";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
  listCode: Array<{ value:number, name: string }> = [
    { value:1 , name: "1" },
    { value:2 , name: "2" },
    { value:3 , name: "3" },
    { value:4 , name: "4" },
    { value:5 , name: "5" },

  ] 
  
  constructor(public typeService: TypesService, public fb: FormBuilder,private datePipe: DatePipe)
  {
    this.typeService.validateForm = this.fb.group({
      name: ["", Validators.required],
      actif: ["", Validators.required],
      nbJourAn : ["", Validators.required],
      MaxJourPris: ["", Validators.required],
      anciennete: ["", Validators.required],
      maxHeureAuto: ["", Validators.required],
      nbFoisMois: ["", Validators.required],

    });
  }

  ngOnInit(): void {
    if (this.typeService.SELECTED_TYPE) {
      
        
      this.typeService.validateForm.controls.name.patchValue(
        this.typeService.SELECTED_TYPE.name
      );
      
      this.typeService.validateForm.controls.actif.patchValue(
        this.typeService.SELECTED_TYPE.actif
      );

      this.typeService.validateForm.controls.nbJourAn.patchValue(
        this.typeService.SELECTED_TYPE.nbJourAn
      );
      this.typeService.validateForm.controls.MaxJourPris.patchValue(
        this.typeService.SELECTED_TYPE.MaxJourPris
      );
      this.typeService.validateForm.controls.anciennete.patchValue(
        this.typeService.SELECTED_TYPE.anciennete
      );
      this.typeService.validateForm.controls.maxHeureAuto.patchValue(
        this.typeService.SELECTED_TYPE.maxHeureAuto
      );
  
      this.typeService.validateForm.controls.nbFoisMois.patchValue(
        this.typeService.SELECTED_TYPE.nbFoisMois
      );
    }
  }

  submitForm(data): void {}
}
