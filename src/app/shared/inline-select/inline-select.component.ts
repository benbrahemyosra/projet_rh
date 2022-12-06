import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import { MenuServiceService } from 'src/app/pages/menus/service/menu-service.service';
import { OptionServiceService } from 'src/app/pages/options/service/option-service.service';
import { PlatServiceService } from 'src/app/pages/plats/service/plat-service.service';
@Component({
  selector: 'app-inline-select',
  templateUrl: './inline-select.component.html',
  styleUrls: ['./inline-select.component.scss'],
})
export class InlineSelectComponent implements OnInit, AfterViewInit {
  @Input('selectable') selectable?: boolean;
  @Input('editable') editable?: boolean;
  @Input('type') type?: string;
  @Input('CUSTOM_ID') CUSTOM_ID?: string | null;
  @Input('LIST') LIST?: number[];
  @Output() listChanged = new EventEmitter<number[]>();
  ARRAY_OF_ITEMS = [0,0,0,0,0,0];
  isChef = localStorage.getItem('isChef');
  constructor(
    private _optionService: OptionServiceService,
    private _platService: PlatServiceService,
    private _APP_SERVICE: AppServiceService,
    private _menuService: MenuServiceService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (!this.selectable) {
      this.uneditable();
    }

    if (this.LIST?.length > 0) {
      document
        .getElementById(this.CUSTOM_ID + '_' + this.type + '_' + 2)
        ?.classList.toggle('selected');
    }
  }

  ngOnInit(): void {}

  uneditable() {
    const ITEMS = Array.from(document.getElementsByClassName('item'));
    if (ITEMS.length !== 0) {
      ITEMS.forEach((element: Element) => {
        if (element.id.includes(this.CUSTOM_ID + '_' + this.type)) {
          element.classList.toggle('selected');
        }
      });
    } else {
      setTimeout(() => {
        this.uneditable();
      }, 200);
    }
  }

  itemClicked(id: string) {
    if (this.selectable) {
      if (document.getElementById(id)?.classList.contains('selected')) {
        this.LIST.pop();
        this.listChanged.emit(this.LIST);
      } else {
        this.LIST.push(1);
        this.listChanged.emit(this.LIST);
      }
      document.getElementById(id)?.classList.toggle('selected');
    } else {
      if (this.type === 'plat') {
        this.router.navigate(['home/plats/detail']);
        this._APP_SERVICE.closeDialog.emit();
      } else if (this.type === 'menu') {
        this.router.navigate(['home/menus/detail']);
        this._APP_SERVICE.closeDialog.emit();
      } else {
        this._APP_SERVICE.MODALS_NUMBER.push('option_detail');
        this._optionService.isVisibleDetail = true;
      }
    }
  }

  scroll(num: number) {
    document.getElementsByClassName('wrapper')[0].scrollLeft += num;
  }

  isChecked(id: string) {
    return document.getElementById(id)?.classList.contains('selected');
  }

  checkValidity() {
    if (this.isChef) {
      if (this.editable) {
        return this.type === 'option' ? false : true;
      } else {
        return false;
      }
    } else {
      return this.editable;
    }
  }

  clickedEdit() {
    if (this.type === 'option') {
      this._APP_SERVICE.MODALS_NUMBER.push('option');
      this._optionService.SELECTED_OPTION = { title: 'option', price: 10 };
      this._optionService.isVisible = true;
    } else if (this.type === 'menu') {
      this._APP_SERVICE.MODALS_NUMBER.push('menu');
      this._menuService.SELECTED_MENU = {
        name: 'menu',
        description: 'lorem ...',
        price: 10,
      };
      this._menuService.isVisible = true;
    } else {
      this._APP_SERVICE.MODALS_NUMBER.push('plat');
      this._platService.SELECTED_DISH = {
        title: 'plat',
        description: 'lorem ...',
        price: 10,
      };
      this._platService.isVisible = true;
    }
  }
  clickedDelete(i) {
    this.ARRAY_OF_ITEMS.splice(i, 1);
  }
  clickedAdd() {
    if (this.type === 'option') {
      this._APP_SERVICE.MODALS_NUMBER.push('option');
      this._optionService.isVisible = true;
    } else if (this.type === 'menu') {
      this._APP_SERVICE.MODALS_NUMBER.push('menu');
      this._menuService.isVisible = true;
    } else {
      this._APP_SERVICE.MODALS_NUMBER.push('plat');
      this._platService.isVisible = true;
    }
  }
}
