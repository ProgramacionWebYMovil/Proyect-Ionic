import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'master',
    pathMatch: 'full',
  },
  {
    path: 'master',
    loadChildren: () => import('./pages/master/master.module').then( m => m.MasterPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/user-authentication/user-authentication.module').then( m => m.UserAuthenticationPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'favs',
    loadChildren: () => import('./pages/favs/favs.module').then( m => m.FavsPageModule)
  },


];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
