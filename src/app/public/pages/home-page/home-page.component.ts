import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeSelectorComponent } from "../../../shared/components/theme-selector/theme-selector.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [
    TranslocoPipe,
    ThemeSelectorComponent
  ]
})
export class HomePageComponent {

}
