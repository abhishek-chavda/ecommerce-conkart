import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  public dialogRef = inject(MatDialogRef<ProductDetailComponent>);
  public product = inject(MAT_DIALOG_DATA);

  constructor() {}
}
