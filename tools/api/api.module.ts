/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthControllerService } from './services/auth-controller.service';
import { PingControllerService } from './services/ping-controller.service';
import { SchoolAdminControllerService } from './services/school-admin-controller.service';
import { SchoolAdminSchoolControllerService } from './services/school-admin-school-controller.service';
import { SchoolControllerService } from './services/school-controller.service';
import { VolunteerControllerService } from './services/volunteer-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthControllerService,
    PingControllerService,
    SchoolAdminControllerService,
    SchoolAdminSchoolControllerService,
    SchoolControllerService,
    VolunteerControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
