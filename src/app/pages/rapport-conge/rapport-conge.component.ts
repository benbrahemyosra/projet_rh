import { Component, OnInit } from '@angular/core';
import { RapportCongeService } from './service/rapport-conge.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rapport-conge',
  templateUrl: './rapport-conge.component.html',
  styleUrls: ['./rapport-conge.component.scss']
})
export class RapportCongeComponent implements OnInit {
  info:any;
  currentDateTime;
  constructor(public rapportService:RapportCongeService,public datepipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.rapportService.rapport.date_creation=this.datepipe.transform((new Date), 'YYYY-MM-dd h:mm');
  }
  
}
