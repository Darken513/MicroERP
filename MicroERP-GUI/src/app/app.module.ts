import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './components/error404/error404.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CodeKeyInputComponent } from './components/code-key-input/code-key-input.component';
import { FlowWrapperComponent } from './components/flow-wrapper/flow-wrapper.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { ItemsChainComponent } from './components/items-chain/items-chain.component';
import { GeneratedReportComponent } from './components/generated-report/generated-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Error404Component,
    CodeKeyInputComponent,
    FlowWrapperComponent,
    RestaurantsListComponent,
    UsersListComponent,
    ItemsChainComponent,
    GeneratedReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
