import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DemandsService } from '../service/demands.service'

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  constructor(
    public demandsService: DemandsService,
    private fb: FormBuilder
  ) {
    this.demandsService.validateForm = this.fb.group({
      comment_reponse : ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
