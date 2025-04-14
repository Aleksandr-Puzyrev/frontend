export interface IFindResult<T> {
  entities: T[];
  itemCount: number;
  page?: number;
  limit?: number;
}

export interface IFindFilter {
  search?: string;
  page?: number;
  limit?: number;
}
