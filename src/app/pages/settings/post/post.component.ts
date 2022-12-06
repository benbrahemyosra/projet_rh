import { Component, OnInit } from '@angular/core';
import { PostService } from "./service/post.service";
import { AppServiceService } from 'src/app/app-service.service';
import { IFilter } from 'src/app/interfaces/filter.interface';
import { IBtnConfig, ITable } from 'src/app/interfaces/table.interface';
import { TableServiceService } from 'src/app/shared/table/service/table-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  table: ITable = this.postService.table;
  filter: IFilter = this.postService.filters;
  constructor(
    public postService: PostService,
    private _APP_SERVICE: AppServiceService,
    private _tableService: TableServiceService,
  ) { }

  ngOnInit(): void {
    this.getAllTypes(1)
  }

  btnClicked(e: any) {
    if (e.btn.name === 'Modifier') {
      this.postService.SELECTED_POST = this.postService.table.data[e.index];
      this._APP_SERVICE.MODALS_NUMBER.push('post');
      this.postService.isVisible = true;
    } else {
      this.postService.deletePost(this.postService.table.data[e.index].id as number).subscribe((res: any) => {
        this.getAllTypes(1);
      })
    }
  }


  pageChanged(page: number) {
    this.getAllTypes(page);
  }

  add() {
    this._APP_SERVICE.MODALS_NUMBER.push('post');
    this.postService.isVisible = true;
  }

  getAllTypes(page: number): void {
    this._tableService.isLoading = true;
    this.postService.getUsersPosts({ page: page }).subscribe((res: any) => {
      this.postService.table.data = res.data;
      this.postService.total = res.total;
      this._tableService.isLoading = false;
    });
  }

  submitedFilter(e) { }


}
