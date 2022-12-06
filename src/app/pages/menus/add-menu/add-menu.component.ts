import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITableData } from 'src/app/interfaces/table.interface';
import { MenuServiceService } from '../service/menu-service.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
})
export class AddMenuComponent implements OnInit {
  @Input('menu') menu!: ITableData | null;
  loading = false;
  constructor(
    private fb: FormBuilder,
    public _menuService: MenuServiceService
  ) {
    this._menuService.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.menu) {
      this._menuService.validateForm.controls['title'].setValue(this.menu.name);
      this._menuService.validateForm.controls['description'].setValue(
        'description'
      );
      this._menuService.validateForm.controls['price'].setValue(
        this.menu.price
      );
      this._menuService.validateForm.controls['title'].markAsTouched();
      this._menuService.validateForm.controls['description'].markAsTouched();
      this._menuService.validateForm.controls['price'].markAsTouched();
    }
  }

  submitForm(value: {
    title: string;
    description: string;
    price: string;
  }): void {
    console.log(value);
  }

  listChanged(list: number[]) {
    this._menuService.LIST_OF_DISHES = list;
  }
}
