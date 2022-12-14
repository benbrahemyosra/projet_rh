import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IChef } from 'src/app/interfaces/chef.interface';
import { IUploadConfig } from 'src/app/interfaces/upload.interface';
import { UserServiceService } from '../service/user-service.service';
import { PlanningService } from '../../planning/service/planning.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})

export class AddUserComponent implements OnInit {
  @Input('user') user!: IChef | null;

  config_avatar: IUploadConfig = {
    input_type: 'image/*',
    form_name: 'image',
    api_endpoint: 'http://localhost:8000/mobile/general_settings/upload_image',
    fileList: [],
    length: 1,
    nzShowButton: (data: NzUploadFile[], length: number) =>
      data.length < length,
  };

  types: Array<any> = [];
  posts: Array<any> = [];
  departments: Array<{ id: number, label: string }> = [
    { id: 0, label: "Administration" },
    { id: 1, label: "Salariés" },
  ]
  allCity: Array<{ value: string, name: string }> =[];

  constructor(
    public userService: UserServiceService,
    private fb: FormBuilder,
    private fb_private: FormBuilder,
    public planningService: PlanningService,
    public http: HttpClient,


  ) {
    this.userService.validateForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      type_employee: ['', Validators.required],
      poste_id: ['', Validators.required],
      departement: ['', Validators.required],
      email: [
        '',
        [
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
    this.userService.validateForm_private = this.fb_private.group({
      city: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      phoneHome: ['', Validators.required],
      phonePro: ['', Validators.required],
      date_arrive: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTypes();
    this.getPosts();
     this.http.get<any>("assets/tn.json").subscribe((data:any)=>{
     let i=0;
       for(let item of data){
        this.allCity[i]={name:item.city,value:item.city};
        i++;
       }
      console.log(this.allCity)
       } )
    console.log(this.planningService.suivant)
    if (this.user) {
      console.log(this.user);
      this.userService.validateForm.controls.first_name.patchValue(
        this.user.first_name
      )
      this.userService.validateForm.controls.last_name.patchValue(
        this.user.last_name
      )
      this.userService.validateForm.controls.birth_date.patchValue(
        this.user.birth_date
      )
      this.userService.validateForm.controls.type_employee.patchValue(
        this.user.type_employee
      )

      this.userService.validateForm.controls.departement.patchValue(
        this.user.departement
      )
      this.userService.validateForm.controls.email.disable(
      )
      this.userService.validateForm.controls.password.disable(
      )
      this.userService.validateForm.controls.confirm.disable(
      )
      this.userService.validateForm_private.controls.city.patchValue(
        this.user.city
      )
      this.userService.validateForm_private.controls.adress.patchValue(
        this.user.adress
      )
      this.userService.validateForm_private.controls.phoneHome.patchValue(
        this.user.phoneHome
      )
      this.userService.validateForm_private.controls.phonePro.patchValue(
        this.user.phonePro
      )
      this.userService.validateForm_private.controls.date_arrive.patchValue(
        this.user.date_arrive
      )
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
      this.userService.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.userService.validateForm.controls.password.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  }


  getTypes(): void {
    this.userService.getUsersTypes().subscribe((res: any) => {
      console.log(res);
      this.types = res;
    })
  }

  getPosts(): void {
    this.userService.getUsersPosts().subscribe((res: any) => {
      this.posts = res.data;
      if (this.user) {
        this.userService.validateForm.controls.poste_id.patchValue(
          this.user.poste_id
        )
      } });
  }
}
