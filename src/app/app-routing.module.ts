import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PickupPointsComponent } from './components/pickup-points/pickup-points.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'login'},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'pickpoint', component:PickupPointsComponent,canActivate:[GuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
