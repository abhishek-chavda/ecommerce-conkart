import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Brand, Category } from '../../../../interfaces/features';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { AddEditBrandComponent } from '../add-edit-brand/add-edit-brand.component';
import { BrandService } from '../../../../services/brands.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { DialogService } from '../../../../../shared/services/dialog.service';

@Component({
  selector: 'app-brands-list',
  imports: [
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    TableComponent,
    ListHeaderComponent,
  ],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
})
export class BrandsListComponent {
  private brandService = inject(BrandService);
  private commonService = inject(CommonService);
  private dialogService = inject(DialogService);
  private dialog = inject(MatDialog);

  public brands = signal<Category[]>([]);
  public displayedColumns = ['name', 'actions'];

  ngOnInit() {
    this.getBrands();
  }

  public getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (brands) => this.brands.set(brands),
      error: (error) => console.error('Error:', error),
    });
  }

  public onEdit(brand: any): void {
    this.openDialog(brand, true);
  }

  public onDelete(id: any): void {
    this.brandService
      .deleteBrand(id)
      .subscribe({ next: () => this.getBrands() });
  }

  public openDialog(brand?: Brand | null, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditBrandComponent,
      isEdit ? brand : null,
      this.brandService,
      isEdit ? 'updateBrand' : 'createBrand',
      this.getBrands.bind(this)
    );
  }
}
