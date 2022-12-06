import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITableData } from 'src/app/interfaces/table.interface';
import { MeetingService } from "../service//meeting.service";
@Component({
  selector: 'app-detail-meeting',
  templateUrl: './detail-meeting.component.html',
  styleUrls: ['./detail-meeting.component.scss']
})
export class DetailMeetingComponent implements OnInit {
  category = [
    { value: 1, name: 'accepté' },
    { value: 2, name: 'réfuté' },
  ];
  @Input('meeting') meeting!: ITableData | null;

  constructor(
    public meetingService: MeetingService,
    private fb: FormBuilder
  ) {
    this.meetingService.validateForm = this.fb.group({
      category: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

}
