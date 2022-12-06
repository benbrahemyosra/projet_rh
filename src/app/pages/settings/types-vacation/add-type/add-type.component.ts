import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TypesService } from "../service/types.service";
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
  constructor(public typeService: TypesService, public fb: FormBuilder)
  {
    this.typeService.validateForm = this.fb.group({
      name: ["", Validators.required],
      actif: ["", Validators.required],
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

    }
  }

  submitForm(data): void {}
}
