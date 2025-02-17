import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { Product } from '../../../../interfaces/features';
import { ProductService } from '../../../../services/product.service';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [TableComponent, ListHeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private dialogService = inject(DialogService);
  private dialog = inject(MatDialog);

  public products = signal<Product[]>([]);
  public displayedColumns = ['name', 'brand', 'color', 'size', 'actions'];

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        const updatedProducts = products.map((p) => ({
          ...p,
          color: p.attributes.color,
          size: p.attributes.size,
        }));
        this.products.set(updatedProducts);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  public onView(data: any): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '500px',
      data,
    });
  }

  public onEdit(product: any): void {
    this.openDialog(product, true);
  }

  public onDelete(id: any): void {
    this.productService
      .deleteProduct(id)
      .subscribe({ next: () => this.getProducts() });
  }

  public openDialog(product?: Product, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditProductComponent,
      isEdit ? product : null,
      this.productService,
      isEdit ? 'updateProduct' : 'createProduct',
      this.getProducts.bind(this),
      '500px'
    );
  }
}
