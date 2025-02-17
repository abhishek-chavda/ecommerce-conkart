import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-header',
  imports: [MatButtonModule],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
})
export class ListHeaderComponent {
  public title = input.required<string>();
  public openDialog = output();
}
