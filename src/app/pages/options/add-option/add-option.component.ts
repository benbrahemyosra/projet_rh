import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ITableData } from 'src/app/interfaces/table.interface';
import { IUploadConfig } from 'src/app/interfaces/upload.interface';
import { OptionServiceService } from '../service/option-service.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss'],
})
export class AddOptionComponent implements OnInit {
  @Input('option') option!: ITableData | null;
  isChef = localStorage.getItem('isChef');
  loading = false;
  config_photo: IUploadConfig = {
    input_type: 'image/*',
    form_name: 'image',
    api_endpoint: 'http://localhost:8000/mobile/general_settings/upload_image',
    fileList: [],
    length: 1,
    nzShowButton: (data: NzUploadFile[], length: number) =>
      data.length < length,
  };
  constructor(
    private fb: FormBuilder,
    public _optionService: OptionServiceService
  ) {
    this._optionService.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    if (this.isChef) {
      this._optionService.validateForm.controls['title'].disable();
    }
  }

  ngOnInit(): void {
    if (this.option) {
      this.config_photo.fileList.push({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://www.foodpowa.com/wp-content/uploads/2016/11/poulet.jpg',
      });
      this.changedFilelist()

      this._optionService.validateForm.controls['title'].setValue(
        this.option.title
      );
      this._optionService.validateForm.controls['price'].setValue(
        this.option.price
      );
      this._optionService.validateForm.controls['title'].markAsTouched();
      this._optionService.validateForm.controls['price'].markAsTouched();

      this._optionService.IS_VALID_IMAGE_INPUT = true;
    }
  }

  submitForm(value: { title: string; price: string }): void {
    console.log(value);
  }

  changedFilelist() {
    this._optionService.IS_VALID_IMAGE_INPUT =
      this.config_photo.fileList.length > 0;
  }
}
