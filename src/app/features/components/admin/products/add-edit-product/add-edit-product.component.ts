import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Brand, Category, Unit } from '../../../../interfaces/features';
import { AttributeService } from '../../../../services/attribute.service';
import { BrandService } from '../../../../services/brands.service';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-add-edit-product',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<AddEditProductComponent>);
  private attributeService = inject(AttributeService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private unitService = inject(UnitService);
  private brandService = inject(BrandService);

  public productForm!: FormGroup;
  public isEditMode = signal<boolean>(false);
  public attributes = signal<any>(null);
  public categories = signal<Category[]>([]);
  public units = signal<Unit[]>([]);
  public brands = signal<Brand[]>([]);

  ngOnInit() {
    this.createProductForm();
    this.getAttributes();
    this.getCategories();
    this.getUnits();
    this.getBrands();

    if (this.data) {
      this.getProductById(this.data.id);
      this.isEditMode.set(true);
    }
  }

  public getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (units) => this.units.set(units),
      error: (error) => console.error('Error:', error),
    });
  }

  public getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (brands) => this.brands.set(brands),
      error: (error) => console.error('Error:', error),
    });
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => console.error('Error:', error),
    });
  }

  public getAttributes(): void {
    this.attributeService.getAttributes().subscribe({
      next: (attributes) => this.attributes.set(attributes),
      error: (error) => console.error('Error:', error),
    });
  }

  public getProductById(id: number) {
    this.productService.getProductById(this.data.id).subscribe({
      next: (product) => this.productForm.patchValue(product),
    });
  }

  public onSelectChange(event: MatSelectChange, selectType: string): void {
    let obj;
    switch (selectType) {
      case 'brand':
        obj = this.brands().find((b) => b.id === event.value);
        break;
      case 'category':
        obj = this.categories().find((b) => b.id === event.value);
        break;
      default:
        break;
    }
    this.productForm.get(selectType)?.setValue(obj?.name);
  }

  public onSubmit(): void {
    const productObj = {
      ...this.productForm.value,
      createdAt: new Date().toISOString(),
    };

    this.dialogRef.close(productObj);
  }

  private createProductForm(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      categoryId: ['', Validators.required],
      category: [''],
      brandId: ['', Validators.required],
      brand: [''],
      unitId: ['', Validators.required],
      unit: ['', [Validators.required, , Validators.min(1)]],
      attributes: this.fb.group({
        color: ['', Validators.required],
        size: ['', Validators.required],
      }),
    });
  }

  public get attributeArray() {
    return this.productForm.get('attributes') as FormArray;
  }
}
