import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = localStorage.getItem('accessToken');

  if (auth != null) {
    return true;
  } else {
    router.navigateByUrl('auth/signin');
    return false;
  }
};
