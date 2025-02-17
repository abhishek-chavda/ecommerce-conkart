import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Product } from '../../../../interfaces/features';
import { ProductService } from '../../../../services/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [
    TableComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recent-product-list.component.html',
  styleUrl: './recent-product-list.component.scss',
})
export class RecentProductListComponent {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  public displayedColumns = ['name', 'brand', 'description', 'actions'];
  public recentProducts = signal<any>([]);
  public productSearchCTRL: FormControl = new FormControl();

  ngOnInit() {
    this.getProductsBySearch();
  }

  private getProductsBySearch(): void {
    this.productSearchCTRL.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        switchMap((term: string) =>
          term.trim() === ''
            ? this.getRecentProducts()
            : this.productService.searchProducts(term)
        )
      )
      .subscribe((data) => {
        this.recentProducts.set(data);
      });
  }

  private getRecentProducts(): Observable<Product[]> {
    const params = {
      _sort: 'createdAt',
      _order: 'desc',
      _limit: 3,
    };
    return this.productService.getProducts(params);
  }

  public onView(data: any): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '500px',
      data,
    });
  }
}
