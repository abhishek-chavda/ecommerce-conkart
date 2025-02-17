import { Component, inject, signal } from '@angular/core';
import { ListHeaderComponent } from '../../../../../shared/components/list-header/list-header.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { Attribute } from '../../../../interfaces/features';
import { AttributeService } from '../../../../services/attribute.service';
import { AddEditAttributeComponent } from '../add-edit-attribute/add-edit-attribute.component';

@Component({
  selector: 'app-attribute-list',
  imports: [TableComponent, ListHeaderComponent],
  templateUrl: './attribute-list.component.html',
  styleUrl: './attribute-list.component.scss',
})
export class AttributeListComponent {
  private attributeService = inject(AttributeService);
  private dialogService = inject(DialogService);

  public attributes = signal<Attribute[]>([]);
  public displayedColumns = ['name', 'values', 'actions'];

  ngOnInit() {
    this.getAttributes();
  }

  public getAttributes(): void {
    this.attributeService.getAttributes().subscribe({
      next: (attributes) => this.attributes.set(attributes),
      error: (error) => console.error('Error:', error),
    });
  }

  public onEdit(attribute: any): void {
    this.openDialog(attribute, true);
  }

  public onDelete(id: any): void {
    this.attributeService
      .deleteAttribute(id)
      .subscribe({ next: () => this.getAttributes() });
  }

  public openDialog(attribute?: Attribute | null, isEdit: boolean = false) {
    this.dialogService.openDialog(
      AddEditAttributeComponent,
      isEdit ? attribute : null,
      this.attributeService,
      isEdit ? 'updateAttribute' : 'createAttribute',
      this.getAttributes.bind(this)
    );
  }
}
