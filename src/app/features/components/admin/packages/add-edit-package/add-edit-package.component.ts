import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { uniqueColorSizeValidator } from '../../../../../shared/validators/validator';
import { Brand, Category, Product } from '../../../../interfaces/features';
import { BrandService } from '../../../../services/brands.service';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-package',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    JsonPipe,
  ],
  templateUrl: './add-edit-package.component.html',
  styleUrl: './add-edit-package.component.scss',
})
export class AddEditPackageComponent {
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  public dialogRef = inject(MatDialogRef<AddEditPackageComponent>);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);

  public categories = signal<Category[]>([]);
  public brands = signal<Brand[]>([]);
  public products = signal<Product[]>([]);
  public selectedProduct = signal<Product | null>(null);

  public packageForm!: FormGroup;
  public isEditMode = signal<boolean>(false);

  ngOnInit() {
    this.createPackageForm();
    this.getCategories();
    this.getBrands();

    if (this.data) {
      //PATCH FORM DATA
      this.getProductById(this.data.productId);
      this.onUnitChange({ value: this.data.unit });
      this.packageForm.patchValue(this.data);
      this.getProductsByFilters();
      this.isEditMode.set(true);
    }
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => console.error('Error:', error),
    });
  }

  public getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (brands) => this.brands.set(brands),
      error: (error) => console.error('Error:', error),
    });
  }

  public getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.selectedProduct.set(product),
    });
  }

  public getProductsByFilters(): void {
    const { categoryId, brandId } = this.controls;

    if (categoryId.value && brandId.value) {
      const params = {
        categoryId: categoryId.value,
        brandId: brandId.value,
      };

      this.productService.getProducts(params).subscribe({
        next: (products) => this.products.set(products),
      });
    }
  }

  private createPackageForm(): void {
    this.packageForm = this.fb.group({
      id: [null],
      categoryId: ['', Validators.required],
      category: [''],
      brandId: ['', Validators.required],
      brand: [''],
      productId: ['', Validators.required],
      unit: ['', [Validators.required, Validators.min(1)]],
      attributes: this.fb.array([], uniqueColorSizeValidator()),
    });
  }

  public addAttributeForm() {
    const attributeGroup = this.fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
    });
    this.attributes.push(attributeGroup);
  }

  public onUnitChange(event: any): void {
    this.attributes.clear();
    for (let i = 0; i < event.value; i++) {
      this.addAttributeForm();
    }
  }
  public onSubmit(): void {
    this.dialogRef.close(this.packageForm.value);
  }

  public get attributes() {
    return this.controls['attributes'] as FormArray;
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.packageForm.controls;
  }
}
