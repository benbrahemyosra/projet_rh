import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { PlanningService } from 'src/app/pages/planning/service/planning.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input('filter') filter!: IFilter;
  @ViewChild('filterForm', { static: false }) filterForm!: NgForm;
  @Output() submitFilterEvent = new EventEmitter<NgForm>();
  date_at!: Date;
  selectedValue: null;
  constructor(public planningService: PlanningService) {}

  ngOnInit(): void {
  }

  submitFilter(form: NgForm) {
    this.submitFilterEvent.emit(form);
  }

  clear() {
    this.filterForm.reset();
    this.submitFilterEvent.emit(this.filterForm.value);
  }
}
