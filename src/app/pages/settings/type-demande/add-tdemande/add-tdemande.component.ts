import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeDemandeService } from '../service/type-demande.service';

@Component({
  selector: 'app-add-tdemande',
  templateUrl: './add-tdemande.component.html',
  styleUrls: ['./add-tdemande.component.scss']
})
export class AddTdemandeComponent implements OnInit {

  constructor(public typeDemandeService: TypeDemandeService, private fb: FormBuilder) { 
    this.typeDemandeService.validateForm = this.fb.group({
      name: ["", Validators.required],
      actif: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.typeDemandeService.SELECTED_TYPE) {
      this.typeDemandeService.validateForm.controls.name.patchValue(
        this.typeDemandeService.SELECTED_TYPE.name
      );
      
      this.typeDemandeService.validateForm.controls.actif.patchValue(
        this.typeDemandeService.SELECTED_TYPE.actif
      );

    }
  }
  submitForm(data: any) {}
}
