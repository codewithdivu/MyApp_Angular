function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    // app: path(ROOTS_DASHBOARD, '/app'),
    // account: path(ROOTS_DASHBOARD, '/account'),
    products: path(ROOTS_DASHBOARD, '/products'),
    product: (id:string) => path(ROOTS_DASHBOARD, `/product/${id}`),
    checkout: path(ROOTS_DASHBOARD, '/checkout'),
  },
};
