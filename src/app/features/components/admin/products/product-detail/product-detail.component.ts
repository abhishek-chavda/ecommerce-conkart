import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductVariant } from '../../../../interfaces/features';

@Component({
  selector: 'app-product-detail',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  public dialogRef = inject(MatDialogRef<ProductDetailComponent>);
  public product = inject(MAT_DIALOG_DATA);

  public variants = signal<ProductVariant[]>([]);

  ngOnInit() {
    this.getVariants();
  }

  public getVariants(): void {
    const variants = this.product.attributes.color
      .map((color: any) =>
        this.product.attributes.size.map((size: any) => ({
          id: `${color}-${size}`,
          name: this.product.name,
          brand: this.product.brand,
          color: color,
          size: size,
        }))
      )
      .flat();
    this.variants.set(variants);
  }
}
