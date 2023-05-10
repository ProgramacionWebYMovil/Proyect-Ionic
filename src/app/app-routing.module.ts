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
  },
  {
    path: 'master',
    loadChildren: () => import('./master/master.module').then( m => m.MasterPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/user-authentication/user-authentication.module').then( m => m.UserAuthenticationPageModule)
  },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
