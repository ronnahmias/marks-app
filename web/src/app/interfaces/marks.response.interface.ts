import { Marks } from '../models/marks';

export interface IMarksResponse {
  total: number;
  data: Marks[];
}
