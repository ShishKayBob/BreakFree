import { Component, Input } from '@angular/core';

@Component({
  selector: 'call-to-action-link',
  imports: [],
  templateUrl: './call-to-action-link.component.html',
  styleUrl: './call-to-action-link.component.scss'
})
export class CallToActionLinkComponent {
  @Input()
  public linkText: string = '';

  @Input()
  public linkUrl: string = '';

}
