import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import { IChef } from 'src/app/interfaces/chef.interface';
import { ChefsServiceService } from '../service/chefs-service.service';

@Component({
  selector: 'app-detail-chef',
  templateUrl: './detail-chef.component.html',
  styleUrls: ['./detail-chef.component.scss'],
})
export class DetailChefComponent implements OnInit {
  images: string[] = [
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
    'https://insidr.co/wp-content/uploads/2018/04/Boeuf-Bourguignon-1170x780-2-1170x780.jpg',
    'https://wallpaperaccess.com/full/2567132.jpg',
    'https://media.gettyimages.com/photos/closeup-of-cooked-scallops-on-bed-of-vegetables-picture-id184339275?s=612x612',
    'https://wallpaperaccess.com/full/2567134.jpg',
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
  ];
  isLoading = true;
  isChef = localStorage.getItem('isChef');
  EXPAND: boolean = false;
  expanded_content: string = '';
  content: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.';
  chef = { first_name: 'qsd', last_name: 'qsd' };
  constructor(
    private location: Location,
    private router: Router,
    public _chefService: ChefsServiceService,
    private _APP_SERVICE: AppServiceService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.expanded_content =
      this.content.length < 700
        ? this.content
        : this.content.substr(0, 700) + '...';
  }

  onBack() {
    this.location.back();
  }

  goToDishDetail() {
    this.router.navigate(['/home/plats/detail']);
  }

  expand() {
    this.expanded_content = this.content;
    this.EXPAND = true;
  }

  edit() {
    this._APP_SERVICE.MODALS_NUMBER.push('chef');
    this._chefService.SELECTED_CHEF = { first_name: 'asd', last_name: 'asd' };
    this._chefService.isVisible = true;
  }
}
