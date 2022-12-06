import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypePlanningService } from '../service/type-planning.service';

@Component({
  selector: 'app-add-type-planning',
  templateUrl: './add-type-planning.component.html',
  styleUrls: ['./add-type-planning.component.scss']
})
export class AddTypePlanningComponent implements OnInit {

  constructor(public typePlanService: TypePlanningService, private fb: FormBuilder) {
    this.typePlanService.validateForm = this.fb.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
    });
   }

  ngOnInit(): void {
    if (this.typePlanService.SELECTED_PLANNING) {
      this.typePlanService.validateForm.controls.name.patchValue(
        this.typePlanService.SELECTED_PLANNING.name
      );
      
      this.typePlanService.validateForm.controls.code.patchValue(
        this.typePlanService.SELECTED_PLANNING.code
      );
    }
  }
  submitForm(data: any) {}
}
