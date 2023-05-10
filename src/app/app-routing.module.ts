import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'master',
    loadChildren: () => import('./master/master.module').then( m => m.MasterPageModule)
  },
<<<<<<< HEAD
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/user-authentication/user-authentication.module').then( m => m.UserAuthenticationPageModule)
  },
];
=======
>>>>>>> ff010b25d1b891ce3767a5c9949e9c62ff352e58

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
