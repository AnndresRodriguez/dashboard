import { Observable } from 'rxjs';
import { Users } from '../models/registered-users';

export abstract class RegisteredUsersPort {
  abstract getRegisteredUsers(): Observable<Users>;
}
