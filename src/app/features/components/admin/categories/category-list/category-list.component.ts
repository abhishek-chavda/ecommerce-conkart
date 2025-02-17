import { Component, inject, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Category } from '../../../../interfaces/features';
import { CategoryService } from '../../../../services/category.service';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { DialogService } from './../../../../../shared/services/dialog.service';

@Component({
  selector: 'app-view-category',
  imports: [
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    TableComponent,
    ListHeaderComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  private categoryService = inject(CategoryService);
  private dialogService = inject(DialogService);

  public categories = signal<Category[]>([]);
  public displayedColumns = ['name', 'description', 'actions'];

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => console.error('Error:', error),
    });
  }

  public onEdit(category: any): void {
    this.openDialog(category, true);
  }

  public onDelete(id: any): void {
    this.categoryService
      .deleteCategory(id)
      .subscribe({ next: () => this.getCategories() });
  }

  public openDialog(category?: Category | null, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditCategoryComponent,
      isEdit ? category : null,
      this.categoryService,
      isEdit ? 'updateCategory' : 'createCategory',
      this.getCategories.bind(this)
    );
  }
}
