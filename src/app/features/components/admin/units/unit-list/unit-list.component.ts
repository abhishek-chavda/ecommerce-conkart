import { Component, inject, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Unit } from '../../../../interfaces/features';
import { UnitService } from '../../../../services/unit.service';
import { AddEditUnitComponent } from '../add-edit-unit/add-edit-unit.component';
import { DialogService } from './../../../../../shared/services/dialog.service';

@Component({
  selector: 'app-unit-list',
  imports: [
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    TableComponent,
    ListHeaderComponent,
  ],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss',
})
export class UnitListComponent {
  private unitService = inject(UnitService);
  private dialogService = inject(DialogService);

  public units = signal<Unit[]>([]);
  public displayedColumns = ['name', 'actions'];

  ngOnInit() {
    this.getUnits();
  }

  public getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (units) => {
        this.units.set(units);
      },
    });
  }

  public onEdit(unit: any): void {
    this.openDialog(unit, true);
  }

  public onDelete(id: any) {
    this.unitService.deleteUnit(id).subscribe({ next: () => this.getUnits() });
  }

  public openDialog(unit?: Unit | null, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditUnitComponent,
      isEdit ? unit : null,
      this.unitService,
      isEdit ? 'updateUnit' : 'createUnit',
      this.getUnits.bind(this)
    );
  }
}
