import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeEmployeeService } from '../service/type-employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public empService: TypeEmployeeService, private fb: FormBuilder) {
    this.empService.validateForm = this.fb.group({
      name: ["", Validators.required],
      actif: ["", Validators.required],
    }); 
   }

  ngOnInit(): void {
    
    if (this.empService.SELECTED_EMP) {
      this.empService.validateForm.controls.name.patchValue(
        this.empService.SELECTED_EMP.name
      );
      
      this.empService.validateForm.controls.actif.patchValue(
        this.empService.SELECTED_EMP.actif
      );
    }
  }
  
  submitForm(data: any) {}
}
