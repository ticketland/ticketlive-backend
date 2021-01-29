export default interface ISearchQueryDTO {
  page: number;
  limit: number;
  keyword: string;
  filters: string[];
}
