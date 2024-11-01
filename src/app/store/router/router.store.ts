import { inject, Injectable } from '@angular/core';
import { Data, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import {
  selectQueryParams,
  selectRouteData,
  selectRouteDataProp,
  selectRouteParams,
  selectRouteStateUrl,
  selectRouteUrl
} from './router.selectors';
import { RouterStateUrl } from './router.state';

@Injectable({ providedIn: 'root' })
export class RouterStore {
  private readonly store: Store = inject(Store);

  readonly routerStateUrl$: Observable<RouterStateUrl> = this.store
    .select(selectRouteStateUrl)
    .pipe(
      filter((state): state is RouterStateUrl => !!state)
    );

  readonly queryParams$: Observable<Params | undefined> = this.store.select(selectQueryParams);
  readonly data$: Observable<Data | undefined> = this.store.select(selectRouteData);
  readonly params$: Observable<Params | undefined> = this.store.select(selectRouteParams);
  readonly url$: Observable<string | undefined> = this.store.select(selectRouteUrl);

  selectDataProp(propName: string): Observable<any> {
    return this.store.select(selectRouteDataProp({ propName }));
  }
}
