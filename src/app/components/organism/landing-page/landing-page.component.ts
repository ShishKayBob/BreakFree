import { Component } from '@angular/core';
import { HeaderComponent } from '../../atom/header/header.component';
import { ImageComponent } from '../../atom/image/image.component';
import { CallToActionLinkComponent } from '../../atom/call-to-action-link/call-to-action-link.component';

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, ImageComponent, CallToActionLinkComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
