import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './principal1/service/product.service';
import { CountryService } from './principal1/service/country.service';
import { CustomerService } from './principal1/service/customer.service';
import { EventService } from './principal1/service/event.service';
import { IconService } from './principal1/service/icon.service';
import { NodeService } from './principal1/service/node.service';
import { PhotoService } from './principal1/service/photo.service';
import { HttpClientModule } from '@angular/common/http';
//import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule
       
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService, DatePipe,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
