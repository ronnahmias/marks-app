import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Marks } from 'src/app/models/marks';
import { MarksService } from 'src/app/services/marks.service';
import { PageEvent } from '@angular/material/paginator';
import { IMarksResponse } from 'src/app/interfaces/marks.response.interface';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-marks-table',
  templateUrl: './marks-table.component.html',
  styleUrls: ['./marks-table.component.scss'],
})
export class MarksTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Marks>();
  totalItems: number = 0;
  skip: number = 0;
  take: number = 5;
  filterStudent: string = '';
  filterClass: string = '';
  filterMark: string = '';
  filterTeacher: string = '';
  sortDirection: string = '';
  sortActive: string = '';
  displayedColumnsKeys: string[] = [
    'position',
    'student_name',
    'class_name',
    'mark',
    'teacher_name',
  ];

  constructor(private marksService: MarksService, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getMarksList();
  }

  onPageChange(event: PageEvent): void {
    this.skip = event.pageIndex;
    this.take = event.pageSize;
    this.getMarksList();
  }

  getPosition(element: Marks): number {
    const index = this.dataSource.data.indexOf(element);
    return index + 1 + this.skip * this.take;
  }

  filterData(): void {
    this.getMarksList();
  }

  sortData(event: Sort) {
    const direction = event.direction;
    const active = event.active;
    this.sortDirection = direction;
    this.sortActive = active;
    this.getMarksList();
  }

  onLogout(): void {
    localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
  }

  onClearFilters(): void {
    this.filterStudent = '';
    this.filterClass = '';
    this.filterMark = '';
    this.filterTeacher = '';
    this.sortDirection = '';
    this.sortActive = '';
    this.getMarksList();
  }

  getMarksList(): void {
    const filters = {
      skip: this.skip,
      take: this.take,
      ...(this.filterStudent && { student_name: this.filterStudent }),
      ...(this.filterClass && { class_name: this.filterClass }),
      ...(this.filterMark && { mark: this.filterMark }),
      ...(this.filterTeacher && { teacher_name: this.filterTeacher }),
      ...(this.sortDirection && { sortDirection: this.sortDirection }),
      ...(this.sortActive && { sortActive: this.sortActive }),
    };
    this.marksService.getMarksList(filters).subscribe((res: IMarksResponse) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.totalItems = res.total;
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.currentIndex == 0) {
      return;
    }
    moveItemInArray(
      this.displayedColumnsKeys,
      event.previousIndex,
      event.currentIndex
    );
  }
}
