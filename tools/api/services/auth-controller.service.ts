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

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerInfo
   */
  static readonly AuthControllerInfoPath = '/auth/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `info()` instead.
   *
   * This method doesn't expect any request body.
   */
  info$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `info$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  info(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.info$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation authControllerRootLogin
   */
  static readonly AuthControllerRootLoginPath = '/auth/login/root';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rootLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rootLogin$Response(params: {
    context?: HttpContext

    /**
     * The credentials of the user. The login_id/email and password combination if realm is `email`.
     */
    body: {
'username'?: string;
'password': string;
}
  }
): Observable<StrictHttpResponse<{
'accessToken': string;
'refreshToken'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerRootLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'accessToken': string;
        'refreshToken'?: string;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rootLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rootLogin(params: {
    context?: HttpContext

    /**
     * The credentials of the user. The login_id/email and password combination if realm is `email`.
     */
    body: {
'username'?: string;
'password': string;
}
  }
): Observable<{
'accessToken': string;
'refreshToken'?: string;
}> {

    return this.rootLogin$Response(params).pipe(
      map((r: StrictHttpResponse<{
'accessToken': string;
'refreshToken'?: string;
}>) => r.body as {
'accessToken': string;
'refreshToken'?: string;
})
    );
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    context?: HttpContext

    /**
     * The credentials of the user. The login_id/email and password combination if realm is `email`.
     */
    body: {
'username'?: string;
'password': string;
}
  }
): Observable<StrictHttpResponse<{
'accessToken': string;
'refreshToken'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'accessToken': string;
        'refreshToken'?: string;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    context?: HttpContext

    /**
     * The credentials of the user. The login_id/email and password combination if realm is `email`.
     */
    body: {
'username'?: string;
'password': string;
}
  }
): Observable<{
'accessToken': string;
'refreshToken'?: string;
}> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<{
'accessToken': string;
'refreshToken'?: string;
}>) => r.body as {
'accessToken': string;
'refreshToken'?: string;
})
    );
  }

  /**
   * Path part for operation authControllerCreate
   */
  static readonly AuthControllerCreatePath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: {
    context?: HttpContext
    body?: {
}
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: {
    context?: HttpContext
    body?: {
}
  }
): Observable<User> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation authControllerWhoAmI
   */
  static readonly AuthControllerWhoAmIPath = '/auth/whoami';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerWhoAmIPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.whoAmI$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
