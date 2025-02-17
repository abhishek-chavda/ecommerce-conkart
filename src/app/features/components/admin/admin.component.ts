import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin',
  imports: [MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  public sideNavMenus: { label: string; url: string }[] = [
    {
      label: 'Categories',
      url: 'categories',
    },
    {
      label: 'Brands',
      url: 'brands',
    },
    {
      label: 'Packages',
      url: 'packages',
    },
    {
      label: 'Products',
      url: 'products',
    },
    {
      label: 'Attributes',
      url: 'attributes',
    },
    {
      label: 'Units',
      url: 'units',
    },
  ];
}
