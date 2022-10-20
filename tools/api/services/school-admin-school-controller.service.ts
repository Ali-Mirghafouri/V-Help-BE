/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { School } from '../models/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolAdminSchoolControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation schoolAdminSchoolControllerGetSchool
   */
  static readonly SchoolAdminSchoolControllerGetSchoolPath = '/school-admins/{id}/school';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSchool()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchool$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<School>>> {

    const rb = new RequestBuilder(this.rootUrl, SchoolAdminSchoolControllerService.SchoolAdminSchoolControllerGetSchoolPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<School>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSchool$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchool(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Array<School>> {

    return this.getSchool$Response(params).pipe(
      map((r: StrictHttpResponse<Array<School>>) => r.body as Array<School>)
    );
  }

}
