import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/components/admin/admin.component').then(
        (c) => c.AdminComponent
      ),
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import(
            './features/components/admin/categories/category-list/category-list.component'
          ).then((c) => c.CategoryListComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import(
            './features/components/admin/brands/brands-list/brands-list.component'
          ).then((c) => c.BrandsListComponent),
      },
      {
        path: 'packages',
        loadComponent: () =>
          import(
            './features/components/admin/packages/package-list/package-list.component'
          ).then((c) => c.PackageListComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './features/components/admin/products/product-list/product-list.component'
          ).then((c) => c.ProductListComponent),
      },
      {
        path: 'attributes',
        loadComponent: () =>
          import(
            './features/components/admin/attributes/attribute-list/attribute-list.component'
          ).then((c) => c.AttributeListComponent),
      },
      {
        path: 'units',
        loadComponent: () =>
          import(
            './features/components/admin/units/unit-list/unit-list.component'
          ).then((c) => c.UnitListComponent),
      },
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./features/components/customer/customer.component').then(
        (c) => c.CustomerComponent
      ),
    children: [
      {
        path: 'recent-products',
        loadComponent: () =>
          import(
            './features/components/customer/products/recent-product-list/recent-product-list.component'
          ).then((c) => c.RecentProductListComponent),
      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import(
            './features/components/customer/products/product-detail/product-detail.component'
          ).then((c) => c.ProductDetailComponent),
      },
      {
        path: '',
        redirectTo: 'recent-products',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
