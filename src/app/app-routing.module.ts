import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChefComponent } from './pages/chefs/add-chef/add-chef.component';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { DetailChefComponent } from './pages/chefs/detail-chef/detail-chef.component';
import { CommandsComponent } from './pages/commands/commands.component';
import { LoginComponent } from './pages/login/login.component';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { OptionsComponent } from './pages/options/options.component';
import { DetailUserComponent } from './pages/users/detail-user/detail-user.component';
import { UsersComponent } from './pages/users/users.component';
import { VacationComponent } from './pages/vacation/vacation.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { TrainingComponent } from './pages/training/training.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { PostComponent } from "./pages/settings/post/post.component";
import { TypesVacationComponent } from "./pages/settings/types-vacation/types-vacation.component";
import { DemandsComponent } from './pages/demands/demands.component';
import { PointageComponent } from './pages/pointage/pointage.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { ParamSocieteComponent } from './pages/settings/param-societe/param-societe.component';
import { TypeDemandeComponent } from './pages/settings/type-demande/type-demande.component';
import { TypeEmployeeComponent } from './pages/settings/type-employee/type-employee.component';
import { TypePlanningComponent } from './pages/settings/type-planning/type-planning.component';

var isChef = localStorage.getItem('isChef');

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'home',
    component: MainHomeComponent,
    children: [
      { path: '', redirectTo: isChef ? 'chefs' : 'profile', pathMatch: 'full' },
      { path: 'chefs', pathMatch: 'full', component: ChefsComponent },
      { path: 'conge', pathMatch: 'full', component: VacationComponent },
      { path: 'formation', pathMatch: 'full', component: TrainingComponent },
      { path: 'meeting', pathMatch: 'full', component: MeetingComponent },
      { path: 'calendar', pathMatch: 'full', component: CalendarComponent },

      { path: 'demandes', pathMatch: 'full', component: DemandsComponent },
      { path: 'planning', pathMatch: 'full', component: PlanningComponent },

      { path: 'pointage', pathMatch: 'full', component: PointageComponent },

      { path: 'profile', pathMatch: 'full', component: DetailChefComponent },
      { path: 'chefs/detail', pathMatch: 'full', component: DetailChefComponent },
      { path: 'add-chef', pathMatch: 'full', component: AddChefComponent },
      { path: 'users', pathMatch: 'full', component: UsersComponent },
      {
        path: 'users/detail',
        pathMatch: 'full',
        component: DetailUserComponent,
      },
      { path: 'commands', pathMatch: 'full', component: CommandsComponent },
      { path: 'options', pathMatch: 'full', component: OptionsComponent },
      { path: 'settings/typeConge', pathMatch: 'full', component: TypesVacationComponent },
      { path: 'settings/post', pathMatch: 'full', component: PostComponent },
      { path: 'settings/parametres', pathMatch: 'full', component: ParamSocieteComponent },
      { path: 'settings/typeEmployee', pathMatch: 'full', component: TypeEmployeeComponent },
      { path: 'settings/typePlanning', pathMatch: 'full', component: TypePlanningComponent },
      { path: 'settings/typeDemande', pathMatch: 'full', component: TypeDemandeComponent },

    ],
  },
      { path: '**', pathMatch: 'full', redirectTo: 'home' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {}
