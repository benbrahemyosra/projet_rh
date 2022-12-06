import { NzUploadFile } from 'ng-zorro-antd/upload';

export interface IUploadConfig {
  input_type: string;
  form_name: string;
  api_endpoint: string;
  fileList: NzUploadFile[];
  nzShowButton: (data: NzUploadFile[], length: number) => boolean;
  length: number;
}
