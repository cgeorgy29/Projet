import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { MyProgressBarComponent } from './my-progress-bar/my-progress-bar.component';
import { BigvaluePipe } from './bigvalue.pipe';
import { ManagerComponent } from './modal/manager/manager.component';
import { UnlockComponent } from './modal/unlock/unlock.component';
import { UpgradeComponent } from './modal/upgrade/upgrade.component';
import { AngelComponent } from './modal/angel/angel.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MyProgressBarComponent,
    BigvaluePipe,
    ManagerComponent,
    UnlockComponent,
    UpgradeComponent,
    AngelComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
