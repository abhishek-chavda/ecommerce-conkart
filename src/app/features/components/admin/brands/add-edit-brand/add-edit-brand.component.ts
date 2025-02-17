import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../../interfaces/features';
import { CategoryService } from '../../../../services/category.service';
import { AddEditCategoryComponent } from '../../categories/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-add-edit-brand',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-brand.component.html',
  styleUrl: './add-edit-brand.component.scss',
})
export class AddEditBrandComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  private categoryService = inject(CategoryService);
  public dialogRef = inject(MatDialogRef<AddEditCategoryComponent>);

  public brandForm!: FormGroup;
  public isEditMode = signal<boolean>(false);
  public categories = signal<Category[]>([]);

  ngOnInit() {
    this.getCategories();
    this.createBrandForm();
    this.brandForm.patchValue(this.data);
  }

  public createBrandForm() {
    this.brandForm = this.fb.group({
      id: [null],
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => console.error('Error:', error),
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.brandForm.value);
  }
}
