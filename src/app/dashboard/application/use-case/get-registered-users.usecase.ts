import { inject } from '@angular/core';
import { RegisteredUsersPort } from '../../domain/ports/registered-users.port';
import { Observable } from 'rxjs';
import { Users } from '../../domain/models/registered-users';

export class GetRegisteredUsersUseCase {
  private readonly registeredUsersPort = inject(RegisteredUsersPort);

  execute(): Observable<Users> {
    return this.registeredUsersPort.getRegisteredUsers();
  }
}
