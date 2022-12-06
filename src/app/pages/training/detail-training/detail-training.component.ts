import { Component, OnInit, Input } from '@angular/core';
import { TrainingService } from '../service/training.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ITableData } from 'src/app/interfaces/table.interface';

@Component({
  selector: 'app-detail-training',
  templateUrl: './detail-training.component.html',
  styleUrls: ['./detail-training.component.scss'],
})
export class DetailTrainingComponent implements OnInit {
  category = [
    { value: 1, name: 'accepté' },
    { value: 2, name: 'réfuté' },
  ];
  @Input('training') training!: ITableData | null;
  constructor(
    public trainingService: TrainingService,
    private fb: FormBuilder
  ) {
    this.trainingService.validateForm = this.fb.group({
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}
