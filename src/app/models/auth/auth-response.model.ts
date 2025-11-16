import { User } from '../user/user.model';

export interface AuthResponse {
  accessToken: string;
  user: User;
}
