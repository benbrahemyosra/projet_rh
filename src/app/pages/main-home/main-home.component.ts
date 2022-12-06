import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ChefsServiceService } from '../chefs/service/chefs-service.service';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
})
export class MainHomeComponent implements OnInit {
  constructor(
    public _chefService: ChefsServiceService,
    public _appService: AppServiceService,
    private modal: NzModalService,

  ) {}

  ngOnInit(): void {}
  confirmModal?: NzModalRef;
  isCollapsed = false;

  getClass() {
    if (!this.isCollapsed) {
      return 'right-layout';
    }
    return 'right-layout-collapsed';
  }

  logout() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      nzCentered: true,
      nzWidth: '26vw',
      nzClosable: false,
      nzOnOk: () => {
        localStorage.clear();
        window.location.replace('/login');
      },
    });
  }
}
