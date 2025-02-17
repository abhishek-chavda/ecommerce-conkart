import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CommonService } from '../../../../../shared/services/common.service';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { Package } from '../../../../interfaces/features';
import { PackageService } from '../../../../services/package.service';
import { AddEditPackageComponent } from '../add-edit-package/add-edit-package.component';

@Component({
  selector: 'app-package-list',
  imports: [TableComponent, ListHeaderComponent],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss',
})
export class PackageListComponent {
  private commonService = inject(CommonService);
  private packageService = inject(PackageService);
  private dialogService = inject(DialogService);
  private dialog = inject(MatDialog);

  public packages = signal<Package[]>([]);
  public displayedColumns = ['brand', 'category', 'variants', 'actions'];

  ngOnInit() {
    this.getPackages();
  }

  public getPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (packages) => {
        const updatedPackages = packages.map((p) => ({
          ...p,
          brand: p.brand?.name,
          category: p.category?.name,
          variants: p.attributes
            .map((a) => `${a.color} - ${a.size}`)
            .join(', '),
        }));
        this.packages.set(updatedPackages as any);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  public onEdit(packageData: any): void {
    this.openDialog(packageData, true);
  }

  public onDelete(id: any): void {
    this.packageService.deletePackage(id).subscribe({
      next: () => this.getPackages(),
    });
  }

  public openDialog(packageData?: Package | null, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditPackageComponent,
      isEdit ? packageData : null,
      this.packageService,
      isEdit ? 'updatePackage' : 'createPackage',
      this.getPackages.bind(this),
      '500px'
    );
  }
}
