import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    TranslocoPipe
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private $unsub = new Subject<void>();

  ngOnInit() { }

  ngOnDestroy() {
    this.$unsub.next();
    this.$unsub.complete();
  }
}
