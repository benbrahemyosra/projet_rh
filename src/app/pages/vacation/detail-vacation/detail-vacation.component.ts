import { Component, OnInit, Input } from '@angular/core';
import { ITableData } from 'src/app/interfaces/table.interface';
import { VacationService } from '../service/vacation.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail-vacation',
  templateUrl: './detail-vacation.component.html',
  styleUrls: ['./detail-vacation.component.scss'],
})
export class DetailVacationComponent implements OnInit {
  category = [
    { value: 1, name: 'accepté' },
    { value: 2, name: 'réfuté' },
  ];
  @Input('vacation') vacation!: ITableData | null;

  constructor(
    public vacationService: VacationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}
