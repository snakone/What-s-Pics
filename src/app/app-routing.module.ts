import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from '@core/services/guards/navigation.guard';
import { LoginGuard } from '@core/services/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [NavigationGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule',
    canActivate: [NavigationGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: './shared/components/error404/error404.module#Error404PageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
