import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';


import { AgingReportActions } from './aging-report.actions';
import { AdminActions } from './admin.actions';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    EffectsModule.forRoot([
      AgingReportActions,
      AdminActions
    ])
  ],
  exports: [EffectsModule]
})
export class ActionModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionModule,
      providers: []
    };
  }
}
