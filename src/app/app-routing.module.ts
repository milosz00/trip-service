import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddTripComponent } from "./components/add-trip/add-trip.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { ShopBoxComponent } from "./components/shop-box/shop-box.component";
import { TripDetailsComponent } from "./components/trip-details/trip-details.component";
import { TripListComponent } from "./components/trip-list/trip-list.component";
import { AngularFireAuthGuard ,hasCustomClaim,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuard } from "./components/admin/auth/auth.guard";
import { UpdateTripComponent } from "./components/admin/update-trip/update-trip.component";
import { UserPanelComponent } from "./components/admin/user-panel/user-panel.component";



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {path: 'addTrip' , component: AddTripComponent,canActivate: [AuthGuard,AngularFireAuthGuard], data: { roles: ["admin","worker"] ,authGuardPipe: redirectUnauthorizedToLogin } },
    {path: 'home' , component: HomeComponent},
    {path: 'tripList' , component: TripListComponent},
    {path: 'shopBox' , component: ShopBoxComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: 'trip/:key' , component: TripDetailsComponent},
    {path: 'updateTrip/:key' , component: UpdateTripComponent,canActivate: [AuthGuard,AngularFireAuthGuard] , data: {roles: ["admin","worker"], authGuardPipe: redirectUnauthorizedToLogin }},
    {path: 'userPanel', component: UserPanelComponent,canActivate: [AuthGuard,AngularFireAuthGuard] , data: {roles: ["admin"], authGuardPipe: redirectUnauthorizedToLogin } },
    {path: 'admin' , component: AdminComponent, canActivate: [AuthGuard,AngularFireAuthGuard] , data: {roles: ["admin","worker"], authGuardPipe: redirectUnauthorizedToLogin } },
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent},
    {path: '' , redirectTo:'/login', pathMatch:'full'},
    {path: '**' , component: PageNotFoundComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}