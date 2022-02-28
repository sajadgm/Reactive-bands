import { UserDataService } from './user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BandDataService } from './band-data.service';
import { BandListComponent } from './band-list/band-list.component';
import { SearchBandComponent } from './search-band/search-band.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: 'bands', component: BandListComponent },
  { path: 'search-bands', component: SearchBandComponent },
  { path: '', pathMatch: 'full', redirectTo: 'bands' },
];

@NgModule({
  declarations: [AppComponent, BandListComponent, SearchBandComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
  ],
  providers: [BandDataService, UserDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
