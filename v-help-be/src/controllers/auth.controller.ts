// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {authenticate, TokenService} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {MyUserService, TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';

import {UserProfile, SecurityBindings} from '@loopback/security';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {SchoolAdmin, User} from '../models';
import {AuthenticationService} from '../services';

interface NewUserData extends  Partial<User> {
  type: "admin" | "volunteer";
}

export class AuthController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService : TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService : MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public userProfile : UserProfile,
    @service(AuthenticationService)
    public authService : AuthenticationService,
  ) {}


  @authenticate.skip()
  @post("/auth/register")
  @response(200, {
    description:
      'Returns a UserAccount model instance on success. Otherwise returns an error message.',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User),
      },
    },
  })
  create(
    @requestBody()
    postData : NewUserData
    ){
    const {type, ...credentials} = postData;
    console.log("post data", credentials)
    if(credentials.email && credentials.password) {
      return this.authService.create(
        credentials.email,
        credentials.password,
        credentials,
        type,
      );
    }else{
      throw new Error("Email and password not received")
    }
  }
}
