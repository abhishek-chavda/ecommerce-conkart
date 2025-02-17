import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-edit-category',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss',
})
export class AddEditCategoryComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<AddEditCategoryComponent>);

  public addEditCategoryForm!: FormGroup;
  public isEditMode = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.createCategoryForm();
    if (this.data) {
      this.addEditCategoryForm.patchValue(this.data);
      this.isEditMode.set(true);
    }
  }

  public createCategoryForm() {
    this.addEditCategoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.addEditCategoryForm.value);
  }
}
