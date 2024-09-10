import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlowWrapperComponent } from './components/flow-wrapper/flow-wrapper.component';

const routes: Routes = [
  { path: 'admin', component: DashboardComponent },
  { path: 'home', component: FlowWrapperComponent},
  { path: '**', component: Error404Component, data: { redirect: true }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }