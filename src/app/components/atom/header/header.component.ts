import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input()
  public title: string = '';
}
