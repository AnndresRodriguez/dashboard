import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { RegisteredUsersPort } from '../../domain/ports/registered-users.port';
import { Users } from '../../domain/models/registered-users';
import { map, Observable } from 'rxjs';
import { RegisteredUsersDTO } from '../dtos/api.response';

const MOCK_URL = '/mocks/registered-users.mock.json';

export class RegisteredUsersAdapter implements RegisteredUsersPort {
  private readonly http = inject(HttpClient);

  getRegisteredUsers(): Observable<Users> {
    return this.http
      .get<RegisteredUsersDTO>(MOCK_URL)
      .pipe(map((response) => response.users));
  }
}
