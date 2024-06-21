import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH_AUTH } from '../Constants/path';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = localStorage.getItem('accessToken');

  if (auth != null) {
    return true;
  } else {
    router.navigateByUrl(PATH_AUTH.signin);
    return false;
  }
};
