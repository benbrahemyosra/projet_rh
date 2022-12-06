import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { IUploadConfig } from '../../interfaces/upload.interface';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input('CONFIG') CONFIG!: IUploadConfig;
  @Output() changedFilelist = new EventEmitter<null>();
  video!: string | null;
  previewVisible = false;
  previewImage: string | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  handlePreview = async (file: NzUploadFile) => {
    if (file?.url) {
      this.previewImage = file.url;
    } else {
      this.previewImage = (file.originFileObj as any).url
        ? (file.originFileObj as any).url
        : await getBase64(file.originFileObj!);
    }
    this.previewVisible = true;
  };

  handleRemove = (file: NzUploadFile) => {
    const INDEX = this.CONFIG.fileList.findIndex((e: NzUploadFile) => {
      return e.uid === file.uid;
    });
    if (INDEX >= 0) {
      this.CONFIG.fileList.splice(INDEX, 1);
      this.changedFilelist.emit(null);
      return false;
    }
    return false;
  };

  handleUpload = (item: NzUploadXHRArgs) => {
    const formData = new FormData();
    formData.append(this.CONFIG.form_name, item.file as any);
    return this.http.post(this.CONFIG.api_endpoint, formData).subscribe(
      (res: any) => {
        if (item.file.type?.includes('video')) {
          this.video = res.data.path;
        }
        item.file.url = res.data.path;
        item.onSuccess(null, item.file, item);
        this.changedFilelist.emit(null);
      },
      (err) => {
        item.onError(err, item.file);
      }
    );
  };
}
