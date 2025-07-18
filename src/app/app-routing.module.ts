import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { FrontPageComponent } from './front-page/front-page.component';
import { LandingPageComponent } from './demo/pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FrontPageComponent
      },
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'land',
        component: LandingPageComponent
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component')
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./demo/chart/apex-chart/apex-chart.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component')
      },
      {
        path: 'privileges',
        loadChildren: () => import('./demo/pages/privileges/privileges.module').then((m) => m.PrivilegesModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./demo/pages/registration/registration.module').then((m) => m.RegistrationModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./demo/pages/orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./demo/pages/login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./demo/pages/reports/reports.module').then((m) => m.ReportsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
