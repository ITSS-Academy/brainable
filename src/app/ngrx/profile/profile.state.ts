import { Profile } from '../../models/profile.model';

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  isSuccessful: boolean;
  errorMessage: string;
}
