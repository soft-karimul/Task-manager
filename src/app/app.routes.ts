import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { LoginComponent } from './pages/auth-pages/login/login.component';
import { SignupComponent } from './pages/auth-pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { LeftSidebarComponent } from './pages/dashboard/left-sidebar/left-sidebar.component';
import { MainContentComponent } from './pages/dashboard/main-content/main-content.component';
import { TodoComponent } from './pages/dashboard/todo/todo.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { authGuard } from './core/gurards/auth-gurard';
import { TaskDetailsComponent } from './pages/dashboard/task-details/task-details.component';
import { TasksComponent } from './pages/dashboard/tasks/tasks.component';

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
      }
    ],
  },
];
