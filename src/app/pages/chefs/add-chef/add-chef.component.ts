import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IChef } from 'src/app/interfaces/chef.interface';
import { IUploadConfig } from 'src/app/interfaces/upload.interface';
import { ChefsServiceService } from '../service/chefs-service.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.scss'],
})
export class AddChefComponent implements OnInit {
  @Input('chef') chef!: IChef | null;
  config_avatar: IUploadConfig = {
    input_type: 'image/*',
    form_name: 'image',
    api_endpoint: 'http://localhost:8000/mobile/general_settings/upload_image',
    fileList: [],
    length: 1,
    nzShowButton: (data: NzUploadFile[], length: number) =>
      data.length < length,
  };
  config_list_images: IUploadConfig = {
    input_type: 'image/*',
    form_name: 'image',
    api_endpoint: 'http://localhost:8000/mobile/general_settings/upload_image',
    fileList: [],
    length: 10,
    nzShowButton: (data: NzUploadFile[], length: number) =>
      data.length < length,
  };

  config_video: IUploadConfig = {
    input_type: 'video/mp4,video/x-m4v,video/*',
    form_name: 'image',
    api_endpoint: 'http://localhost:8000/mobile/general_settings/upload_image',
    fileList: [],
    length: 1,
    nzShowButton: (data: NzUploadFile[], length: number) =>
      data.length < length,
  };
  loading = false;

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private fb_restau: FormBuilder,
    public _chefService: ChefsServiceService,
    private msg: NzMessageService
  ) {
    this._chefService.validateForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ],
      ],
      phone : ['', Validators.required],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
    this._chefService.validateForm_restau = this.fb_restau.group({
      restaurant_name: ['', [Validators.required]],
      kitchen_type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.chef) {
      this.chef
        ? this._chefService.validateForm.controls['password'].disable()
        : null;
      this.chef
        ? this._chefService.validateForm.controls['confirm'].disable()
        : null;
      this._chefService.validateForm.clearValidators();
      this.config_avatar.fileList.push({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      });
      this.config_list_images.fileList.push({
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      });
      this._chefService.validateForm_restau.controls[
        'restaurant_name'
      ].setValue('nom du restaurant');
      this._chefService.validateForm_restau.controls['kitchen_type'].setValue(
        'type de cuisine'
      );
      this._chefService.validateForm_restau.controls['description'].setValue(
        'lorem ...'
      );
      this._chefService.validateForm.controls['first_name'].setValue(
        this.chef.first_name
      );
      this._chefService.validateForm.controls['last_name'].setValue(
        this.chef.last_name
      );
      this._chefService.validateForm.controls['email'].setValue(
        this.chef.email
      );
      this._chefService.validateForm.controls['first_name'].markAsTouched();
      this._chefService.validateForm.controls['last_name'].markAsTouched();
      this._chefService.validateForm.controls['email'].markAsTouched();
      this._chefService.validateForm_restau.controls[
        'restaurant_name'
      ].markAsTouched();
      this._chefService.validateForm_restau.controls[
        'kitchen_type'
      ].markAsTouched();
      this._chefService.validateForm_restau.controls[
        'description'
      ].markAsTouched();
    }
  }

  submitForm(value: {
    userName: string;
    email: string;
    password: string;
    confirm: string;
    comment: string;
  }): void {
    console.log(value);
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this._chefService.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  // checkIfEmailExists = (control: FormControl) =>
  //   new Observable((observer: Observer<ValidationErrors | null>) => {
  //     // setTimeout(() => {
  //     // if (control.value === 'qsd@qsd.qsd') {
  //     //   observer.next({ error: true, duplicated: true });
  //     // } else {
  //     observer.next(null);
  //     // }
  //     observer.complete();
  //     // }, 1000);
  //   });

  // pre(): void {
  //   this._chefService.current -= 1;
  // }

  // next(): void {
  //   this._chefService.current += 1;
  // }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this._chefService.validateForm.controls.password.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  changedFilelist() {
    this._chefService.IS_VALID_IMAGE_INPUT =
      this.config_avatar.fileList.length > 0 &&
      this.config_list_images.fileList.length > 0 &&
      this.config_video.fileList.length > 0;
  }
}
