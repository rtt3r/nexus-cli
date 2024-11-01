export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profile: UserProfile;
}

export interface UserProfile {
  avatar?: string;
  biography?: string;
  birthdate?: string;
  headline?: string;
}
