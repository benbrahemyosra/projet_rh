import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParamSocieteService } from '../service/param-societe.service';

@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss']
})
export class AddSocieteComponent implements OnInit {

  constructor(public paramsService: ParamSocieteService, private fb: FormBuilder) { 
  this.paramsService.validateForm = this.fb.group({
    NbJourSemaine: ["", Validators.required],
    NbCongeSolde: ["", Validators.required],
    NbHeureJour: ["", Validators.required],
    MinNbHeure: ["", Validators.required],
  }); }

  ngOnInit(): void {
    if (this.paramsService.SELECTED_PARAMS) {
      this.paramsService.validateForm.controls.NbJourSemaine.patchValue(
        this.paramsService.SELECTED_PARAMS.NbJourSemaine
      );
      
      this.paramsService.validateForm.controls.NbCongeSolde.patchValue(
        this.paramsService.SELECTED_PARAMS.NbCongeSolde
      );

      this.paramsService.validateForm.controls.NbHeureJour.patchValue(
        this.paramsService.SELECTED_PARAMS.NbHeureJour
      );

      this.paramsService.validateForm.controls.MinNbHeure.patchValue(
        this.paramsService.SELECTED_PARAMS.MinNbHeure
      );
    }
  }
  submitForm(data: any) {}
}
