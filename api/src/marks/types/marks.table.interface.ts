export interface IMarksTableRow {
  student_name: string;
  teacher_name: string;
  class_name: string;
  mark: number;
}

export type IStudentMarksTable = Array<IMarksTableRow>;

export interface IStudentMarksTableResponse {
  data: IStudentMarksTable;
  total: number;
}
