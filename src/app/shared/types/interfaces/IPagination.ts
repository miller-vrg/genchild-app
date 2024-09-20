export interface IPagination<T> {
  data: T;
  meta: Meta;
}

export interface Meta {
  page:            number;
  take:            number;
  itemCount:       number;
  pageCount:       number;
  hasNextPage:     boolean;
  hasPreviousPage: boolean;
}

