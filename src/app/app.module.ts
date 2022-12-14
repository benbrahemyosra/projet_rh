import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorInterceptor } from "./pages/interceptor.interceptor";
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TableComponent } from './shared/table/table.component';
import { FilterComponent } from './shared/filter/filter.component';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { UsersComponent } from './pages/users/users.component';
import { CommandsComponent } from './pages/commands/commands.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { LoginComponent } from './pages/login/login.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AddChefComponent } from './pages/chefs/add-chef/add-chef.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DetailChefComponent } from './pages/chefs/detail-chef/detail-chef.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DetailCommandComponent } from './pages/commands/detail-command/detail-command.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { DetailUserComponent } from './pages/users/detail-user/detail-user.component';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { OptionsComponent } from './pages/options/options.component';
import { AddOptionComponent } from './pages/options/add-option/add-option.component';
import { DetailOptionsComponent } from './pages/options/detail-options/detail-options.component';
import { ImageListComponent } from './shared/image-list/image-list.component';
import { UploadComponent } from './shared/upload/upload.component';
import { GeneralModalComponent } from './shared/general-modal/general-modal.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TrainingComponent } from './pages/training/training.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { VacationComponent } from './pages/vacation/vacation.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DetailVacationComponent } from './pages/vacation/detail-vacation/detail-vacation.component';
import { DetailMeetingComponent } from './pages/meeting/detail-meeting/detail-meeting.component';
import { DetailTrainingComponent } from './pages/training/detail-training/detail-training.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddVacationComponent } from './pages/vacation/add-vacation/add-vacation.component';
import { PostComponent } from './pages/settings/post/post.component';
import { TypesVacationComponent } from './pages/settings/types-vacation/types-vacation.component';
import { AddPostComponent } from './pages/settings/post/add-post/add-post.component';
import { AddTypeComponent } from './pages/settings/types-vacation/add-type/add-type.component';
import { DemandsComponent } from './pages/demands/demands.component';
import { AcceptComponent } from './pages/demands/accept/accept.component';
import { PointageComponent } from './pages/pointage/pointage.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { TypeDemandeComponent } from './pages/settings/type-demande/type-demande.component';
import { TypePlanningComponent } from './pages/settings/type-planning/type-planning.component';
import { TypeEmployeeComponent } from './pages/settings/type-employee/type-employee.component';
import { ParamSocieteComponent } from './pages/settings/param-societe/param-societe.component';
import { AddSocieteComponent } from './pages/settings/param-societe/add-societe/add-societe.component';
import { AddTdemandeComponent } from './pages/settings/type-demande/add-tdemande/add-tdemande.component';
import{AddPlanningComponent}from './pages/planning/add-planning/add-planning.component';
import{AddTacheComponent}from './pages/planning/add-tache/add-tache.component';
import{PlanningComponent}from './pages/planning/planning.component';
import { CdTimerModule } from 'angular-cd-timer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AddEmployeeComponent } from './pages/settings/type-employee/add-employee/add-employee.component';
import { AddTypePlanningComponent } from './pages/settings/type-planning/add-type-planning/add-type-planning.component';
import { RapportCongeComponent } from './pages/rapport-conge/rapport-conge.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

registerLocaleData(fr);
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterComponent,
    ChefsComponent,
    UsersComponent,
    CommandsComponent,
    MainHomeComponent,
    LoginComponent,
    AddChefComponent,
    AddTacheComponent,
    DetailChefComponent,
    DetailCommandComponent,
    DetailUserComponent,
    UserCardComponent,
    OptionsComponent,
    AddOptionComponent,
    DetailOptionsComponent,
    ImageListComponent,
    UploadComponent,
    GeneralModalComponent,
    TrainingComponent,
    MeetingComponent,
    VacationComponent,
    CalendarComponent,
    DetailVacationComponent,
    DetailMeetingComponent,
    DetailTrainingComponent,
    AddUserComponent,
    AddVacationComponent,
    PostComponent,
    TypesVacationComponent,
    AddPostComponent,
    AddTypeComponent,
    DemandsComponent,
    AcceptComponent,
    PointageComponent,
    TypeDemandeComponent,
    TypePlanningComponent,
    TypeEmployeeComponent,
    ParamSocieteComponent,
    AddSocieteComponent,
    AddTdemandeComponent,
    AddPlanningComponent,
    PlanningComponent, 
    AddEmployeeComponent,
    AddTypePlanningComponent,
    RapportCongeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdTimerModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    RxReactiveFormsModule,
    NzDividerModule,
    NzRadioModule,
    NzGridModule,
    NzFormModule,
    NzDropDownModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzModalModule,
    NzDatePickerModule,
    NzUploadModule,
    NzMessageModule,
    NzNoAnimationModule,
    NzPopconfirmModule,
    NzCardModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzDescriptionsModule,
    NzImageModule,
    NzCarouselModule,
    NzStepsModule,
    NzSelectModule,
    NzBadgeModule,
    NzBackTopModule,
    NzTypographyModule,
    NzEmptyModule,
    FullCalendarModule,
    NzTimePickerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  },
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
