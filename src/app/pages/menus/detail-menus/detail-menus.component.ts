import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import { MenuServiceService } from '../service/menu-service.service';

@Component({
  selector: 'app-detail-menus',
  templateUrl: './detail-menus.component.html',
  styleUrls: ['./detail-menus.component.scss'],
})
export class DetailMenusComponent implements OnInit {
  isLoading = true;
  content: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nesciunt iste modi excepturi, optio praesentium corporis, necessitatibus non recusandae distinctio saepe pariatur amet dignissimos aliquam. Porro ipsum distinctio repellat quod.';
  images: string[] = [
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
    'https://insidr.co/wp-content/uploads/2018/04/Boeuf-Bourguignon-1170x780-2-1170x780.jpg',
    'https://wallpaperaccess.com/full/2567132.jpg',
    'https://media.gettyimages.com/photos/closeup-of-cooked-scallops-on-bed-of-vegetables-picture-id184339275?s=612x612',
    'https://wallpaperaccess.com/full/2567134.jpg',
    'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
  ];
  chef = { first_name: 'qsd', last_name: 'qsd' };
  EXPAND: boolean = false;
  expanded_content: string = '';
  constructor(
    private location: Location,
    private router: Router,
    private _APP_SERVICE: AppServiceService,
    private _menuService: MenuServiceService
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
    this._APP_SERVICE.MODALS_NUMBER.push('menu');
    this._menuService.SELECTED_MENU = {
      name: 'menu',
      description: 'lorem ...',
      price: 10,
    };
    this._menuService.isVisible = true;
  }
}
