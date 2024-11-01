import { environment as env } from '@/environments/environment';
import { User, UserProfile } from '@/shared/user/user.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { PagedItems } from '../pagination/paged-items';

const API_URL = env.core.url;

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  getMe(): Observable<User> {
    return this._httpClient.get<User>(`${API_URL}/v1/users/me`)
      .pipe(
        take(1),
        tap((me) => {
          this._user.next(me);
        }),
      );
  }

  /**
   * Get the current logged in user data
   */
  get(id: string): Observable<User> {
    return this._httpClient.get<User>(`${API_URL}/v1/users/${id}`)
      .pipe(
        take(1)
      );
  }

  /**
   * Get the current logged in user data
   */
  search(pageIndex?: number, pageSize?: number, sortBy?: string, sortDirection: 'asc' | 'desc' | null = null): Observable<PagedItems<User>> {

    let queryParams = new HttpParams();

    if (pageIndex) {
      queryParams = queryParams.append('page_index', pageIndex);
    }

    if (pageSize) {
      queryParams = queryParams.append('page_size', pageSize);
    }

    if (sortBy) {
      queryParams = queryParams.append('sort_by', sortBy);
    }

    if (sortDirection) {
      queryParams = queryParams.append('sort_direction', sortDirection);
    }

    return this._httpClient.get<PagedItems<User>>(`${API_URL}/v1/users`, { params: queryParams })
      .pipe(
        take(1)
      );
  }

  /**
   * Update the user
   *
   * @param user
   */
  updateProfile(id: string, profile: UserProfile): Observable<User> {
    const { biography, birthdate, headline } = profile;

    const body = {
      biography,
      birthdate,
      headline
    };

    return this._httpClient.patch<User>(`${API_URL}/v1/users/${id}`, body)
      .pipe(
        tap((user) => {
          this._user.next(user);
        }),
      );
  }
}
