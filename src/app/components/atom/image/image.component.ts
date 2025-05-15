import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input()
  public src: string = '';
}
