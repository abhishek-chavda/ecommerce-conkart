import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  imports: [MatButtonModule, MatIconModule, MatTableModule, TitleCasePipe],
  providers: [ConfirmationDialogComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private commonService = inject(CommonService);
  private dialog = inject(MatDialog);

  public dataSource = input.required<any>();
  public actions = input<{
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
  }>({ isView: false, isEdit: true, isDelete: true });

  public onEdit = output();
  public onDelete = output();
  public onView = output();

  public displayedColumns = input.required<any>();
  public isAdmin = this.commonService.isAdmin;

  constructor() {}

  public isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public onDeleteClick(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.onDelete.emit(element.id);
    });
  }
}
