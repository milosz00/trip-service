import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TripListComponent } from 'src/app/components/trip-list/trip-list.component';
import { StarComponent } from 'src/app/components/trip-list/star/star.component';
import { FilterTripsComponent } from 'src/app/components/trip-list/filter-trips/filter-trips.component';
import { PipeNamePipe } from 'src/app/components/trip-list/search-pipes/pipe-name.pipe';
import { PipeCountryPipe } from 'src/app/components/trip-list/search-pipes/pipe-country.pipe';
import { PipePricePipe } from 'src/app/components/trip-list/search-pipes/pipe-price.pipe';
import { PipeDatePipe } from 'src/app/components/trip-list/search-pipes/pipe-date.pipe';
import { PipeStarsPipe } from 'src/app/components/trip-list/search-pipes/pipe-stars.pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShopBoxComponent } from './components/shop-box/shop-box.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateTripComponent } from './components/admin/update-trip/update-trip.component';
import { UserPanelComponent } from './components/admin/user-panel/user-panel.component';






@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    StarComponent,
    FilterTripsComponent,
    PipeNamePipe,
    PipeCountryPipe,
    PipePricePipe,
    PipeDatePipe,
    PipeStarsPipe,
    AddTripComponent,
    HomeComponent,
    PageNotFoundComponent,
    ShopBoxComponent,
    TripDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    UpdateTripComponent,
    UserPanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
