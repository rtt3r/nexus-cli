import { Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from './../../store';
import { RouterStateUrl } from './router.state';

const getRouterStateUrl = (routerState: RouterReducerState<RouterStateUrl>): RouterStateUrl | undefined => {
  return routerState?.state;
};

const getQueryParams = (_: RouterReducerState<RouterStateUrl>, routerStateUrl?: RouterStateUrl): Params | undefined => {
  return routerStateUrl?.queryParams;
};

const getParams = (_: RouterReducerState<RouterStateUrl>, routerStateUrl?: RouterStateUrl): Params | undefined => {
  return routerStateUrl?.params;
};

const getData = (_: RouterReducerState<RouterStateUrl>, routerStateUrl?: RouterStateUrl): Data | undefined => {
  return routerStateUrl?.data;
};

const getUrl = (_: RouterReducerState<RouterStateUrl>, routerStateUrl?: RouterStateUrl): string | undefined => {
  return routerStateUrl?.url;
};

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectRouteStateUrl: MemoizedSelector<AppState, RouterStateUrl | undefined> = createSelector(
  selectRouterState,
  getRouterStateUrl
);

export const selectQueryParams: MemoizedSelector<AppState, Params | undefined> = createSelector(
  selectRouterState,
  selectRouteStateUrl,
  getQueryParams
);

export const selectRouteParams: MemoizedSelector<AppState, Params | undefined> = createSelector(
  selectRouterState,
  selectRouteStateUrl,
  getParams
);

export const selectRouteData: MemoizedSelector<AppState, Data | undefined> = createSelector(
  selectRouterState,
  selectRouteStateUrl,
  getData
);

export const selectRouteDataProp = (props: { propName: string }): MemoizedSelector<AppState, any> =>
  createSelector(
    selectRouterState,
    selectRouteStateUrl,
    selectRouteData,
    (_: RouterReducerState<RouterStateUrl>, __?: RouterStateUrl, data?: Data): any => {
      if (data)
        return data[props.propName];

      return undefined;
    });

export const selectRouteUrl: MemoizedSelector<AppState, string | undefined> = createSelector(
  selectRouterState,
  selectRouteStateUrl,
  getUrl
);
