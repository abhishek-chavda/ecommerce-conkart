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
import { Category, Unit } from '../../../../interfaces/features';

@Component({
  selector: 'app-add-edit-unit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-unit.component.html',
  styleUrl: './add-edit-unit.component.scss',
})
export class AddEditUnitComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<AddEditUnitComponent>);

  public unitForm!: FormGroup;
  public isEditMode = signal<boolean>(false);
  public units = signal<Unit[]>([]);
  public products = signal<Category[]>([]);

  ngOnInit() {
    this.createBrandForm();
    if (this.data) {
      this.unitForm.patchValue(this.data);
      this.isEditMode.set(true);
    }
  }

  private createBrandForm(): void {
    this.unitForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.unitForm.value);
  }
}
