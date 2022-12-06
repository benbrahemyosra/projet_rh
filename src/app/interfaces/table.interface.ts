import { NzTableSortFn } from 'ng-zorro-antd/table';

export interface ITableData {
  [key: string]: any ;
}

export interface IBtnConfig {
  name: string;
  danger: boolean;
  delete: boolean | null

}


export interface IHeader {
  name: string;
  sortFn: NzTableSortFn | null;
  sortDirections: [string | null, string | null, string | null];
  visible:boolean;

}

export interface ITable {
  header: IHeader[];
  data: ITableData[];
  btnConfig: IBtnConfig[];
}

