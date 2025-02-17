import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {
  public sideNavMenus: { label: string; url: string }[] = [
    {
      label: 'Recent Products',
      url: 'recent-products',
    },
  ];
}
