export interface ISelect {
  name: string;
  value: string | boolean | number;
}

export interface IFilterItem {
  label: string;
  placeholder: string;
  input_form_name: string;
  input_form_type: string;
  select_data?: ISelect[];
}

export interface IFilter {
  filters: IFilterItem[];
}
