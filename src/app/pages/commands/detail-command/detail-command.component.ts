import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommandServiceService } from '../service/command-service.service';

@Component({
  selector: 'app-detail-command',
  templateUrl: './detail-command.component.html',
  styleUrls: ['./detail-command.component.scss'],
})
export class DetailCommandComponent implements OnInit {
  constructor(public _commandService: CommandServiceService) {}

  ngOnInit(): void {}

  submitFilter(form: NgForm) {
    // this.submitFilterEvent.emit(form);
    console.log(form);
  }
}
