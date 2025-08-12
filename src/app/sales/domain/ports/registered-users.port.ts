import { Observable } from 'rxjs';
import { RegisteredUsers } from '../models/registered-users';

export abstract class RegisteredUsersPort {
  abstract getRegisteredUsers(): Observable<RegisteredUsers>;
}
