import { inject, computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { AuthService, LoginDto, AuthResponseDto, RegisterDto} from '../../api';
import { firstValueFrom } from 'rxjs';

export interface AuthState {
  user: AuthResponseDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.user() !== null),
    userEmail: computed(() => store.user()?.email || ''),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    async login(credentials: LoginDto) {
      patchState(store, { isLoading: true, error: null });
      try {
        const user = await firstValueFrom(authService.authControllerLoginV1(credentials));
        patchState(store, { user, isLoading: false });
      } catch (error: any) {
        patchState(store, {
          error: error.message || 'Login failed',
          isLoading: false,
        });
      }
    },
    async register(data: RegisterDto) {
      patchState(store, { isLoading: true, error: null });
      try {
        // Register returns UserResponseDto which differs from AuthResponseDto
        // We're just updating loading state for now as registration doesn't automatically log in.
        await firstValueFrom(authService.authControllerRegisterV1(data));
        patchState(store, { isLoading: false });
      } catch (error: any) {
        patchState(store, {
          error: error.message || 'Registration failed',
          isLoading: false,
        });
      }
    },
    async logout() {
      patchState(store, { isLoading: true, error: null });
      try {
        await firstValueFrom(authService.authControllerLogoutV1());
        patchState(store, { user: null, isLoading: false });
      } catch (error: any) {
        patchState(store, {
          error: error.message || 'Logout failed',
          isLoading: false,
        });
      }
    },
    async refreshSession() {
      patchState(store, { isLoading: true, error: null });
      try {
        const user = await firstValueFrom(authService.authControllerRefreshV1());
        patchState(store, { user, isLoading: false });
        return user;
      } catch (error: any) {
        patchState(store, {
          user: null,
          error: error.message || 'Session refresh failed',
          isLoading: false,
        });
        throw error;
      }
    },
  }))
);
