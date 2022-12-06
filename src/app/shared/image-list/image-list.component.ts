import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  @Input('length') length: number;

  images: string[] = [
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
    'https://insidr.co/wp-content/uploads/2018/04/Boeuf-Bourguignon-1170x780-2-1170x780.jpg',
    'https://wallpaperaccess.com/full/2567132.jpg',
    'https://media.gettyimages.com/photos/closeup-of-cooked-scallops-on-bed-of-vegetables-picture-id184339275?s=612x612',
    'https://wallpaperaccess.com/full/2567134.jpg',
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.length === 1) {
      this.images = [this.images[0]];
    }
  }
}
