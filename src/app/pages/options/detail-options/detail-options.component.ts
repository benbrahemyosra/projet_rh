import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-options',
  templateUrl: './detail-options.component.html',
  styleUrls: ['./detail-options.component.scss'],
})
export class DetailOptionsComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {}

  onBack() {
    this.location.back();
  }

  goToDishDetail() {
    this.router.navigate(['/home/plats/detail']);
  }
}
