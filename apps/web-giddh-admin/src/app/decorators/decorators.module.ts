import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserAuthenticated } from './UserAuthenticated';


@NgModule({
  imports: [],
  exports: []
})
export class DecoratorsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DecoratorsModule,
      providers: [
        UserAuthenticated
      ]
    };
  }
}