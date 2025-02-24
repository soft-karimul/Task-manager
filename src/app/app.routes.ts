import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeroComponent } from './features/home/hero/hero.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { LeftSidebarComponent } from './features/dashboard/left-sidebar/left-sidebar.component';
import { MainContentComponent } from './features/dashboard/main-content/main-content.component';
import { TodoComponent } from './features/dashboard/todo/todo.component';
import { OverviewComponent } from './features/dashboard/overview/overview.component';
import { authGuard } from './core/gurards/auth-gurard';
import { TaskDetailsComponent } from './features/dashboard/task-details/task-details.component';
import { TasksComponent } from './features/dashboard/tasks/tasks.component';
import { SettingsComponent } from './features/dashboard/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'dashboard',
        component: OverviewComponent,
      },
      {
        path: 'todo',
        component: TodoComponent,
      },
      {
        path:'taskdetails',
        component:TaskDetailsComponent
      },
      {
        path:'tasks',
        component:TasksComponent
      },
      {
        path:'settings',
        component:SettingsComponent

      }
    ],
  },
];
