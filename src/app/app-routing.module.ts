import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConversionComponent } from "./components/currency-conversion/currency-conversion.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'conversion' },
  {
    path: 'conversion',
    component: CurrencyConversionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
