import { environment as env } from '@/environments/environment';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TitleService {

  constructor(
    private translocoService: TranslocoService,
    private title: Title
  ) { }

  setTitle(title: string) {
    if (title) {
      this.translocoService
        .selectTranslate(title)
        .subscribe(translation =>
          this.title.setTitle(`${translation} - ${env.app.name}`)
        );

    } else {
      this.title.setTitle(env.app.name);
    }
  }
}
