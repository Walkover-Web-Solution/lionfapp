import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';


@NgModule({
  imports: [
    AppModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
  ],
  bootstrap: [AppComponent]
})
export class AppElectronModule {}
