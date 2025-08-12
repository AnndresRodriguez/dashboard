import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../../../core/providers';
import { inject } from '@angular/core';
import { RegisteredUsersPort } from '../../domain/ports/registered-users.port';
import { Users } from '../../domain/models/registered-users';
import { map, Observable } from 'rxjs';
import { RegisteredUsersDTO } from '../dtos/api.response';

export class RegisteredUsersAdapter implements RegisteredUsersPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_REGISTERED_USERS = 'e3d8-2efc-4e24-a7bc';

  getRegisteredUsers(): Observable<Users> {
    return this.http
      .get<RegisteredUsersDTO>(
        `${this.env.apiUrl}/c/${this.ID_JSON_REGISTERED_USERS}`,
      )
      .pipe(map((response) => response.users));
  }
}
