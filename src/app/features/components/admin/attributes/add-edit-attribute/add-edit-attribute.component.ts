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
import { AddEditCategoryComponent } from '../../categories/add-edit-category/add-edit-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-edit-attribute',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-attribute.component.html',
  styleUrl: './add-edit-attribute.component.scss',
})
export class AddEditAttributeComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<AddEditCategoryComponent>);

  public addEditAttributeForm!: FormGroup;
  public isEditMode = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.createCategoryForm();
    if (this.data) {
      this.addEditAttributeForm.patchValue(this.data);
      this.isEditMode.set(true);
    }
  }

  public createCategoryForm() {
    this.addEditAttributeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      // values: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.addEditAttributeForm.value);
  }
}
