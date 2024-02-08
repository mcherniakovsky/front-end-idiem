import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule } from '@angular/material/slide-toggle';
import {LayoutModule} from '@angular/cdk/layout';
import {MenuComponent } from './components/menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule } from '@angular/material/list';
import {MatRadioModule } from '@angular/material/radio';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import {   MatDialogModule} from '@angular/material/dialog';
import { NewProductComponent } from './components/new-product/new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ProductComponent,
    ProgressSpinnerComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule,
    MatRadioModule
  ],
  exports:[MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ProgressSpinnerComponent
  ]
})
export class AppModule { }
