export const ROUTES = [
  {path: '', redirectTo: '404', pathMatch: 'full'},
  {path: '404'},
  // { path: '**', redirectTo: 'login', pathMatch: 'full', canActivate: [CheckIfPublicPath] },
  {path: '**', pathMatch: 'full'}
];
