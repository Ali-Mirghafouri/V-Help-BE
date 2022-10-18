// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {MyUserService, TokenObject, User, UserServiceBindings} from '@loopback/authentication-jwt';

import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {get, getModelSchemaRef, post, requestBody, response, SchemaObject} from '@loopback/rest';
import {AuthenticationService} from '../services';

interface NewUserData extends  Partial<User> {
  type: "admin" | "volunteer";
}

interface LoginCredentials {
  username: string;
  password: string;
}

const TokenSchema: SchemaObject = {
  type: 'object',
  required: ['accessToken'],
  properties: {
    accessToken: {
      type: 'string',
    },
    refreshToken: {
      type: 'string'
    }
  },
};


const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};


export const CredentialsRequestBody = {
  name: 'credentials',
  description:
    'The credentials of the user. The login_id/email and password combination if realm is `email`.',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

@authenticate('jwt')
export class AuthController {
  constructor(
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

  @authenticate.skip()
  @response(200, {
    description: 'Login to the system',
    content: {'application/json': {schema: TokenSchema}},
  })
  @post('/auth/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string'
                }
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody)
      credentials: LoginCredentials,
  ): Promise<TokenObject | Error> {
    // ensure the user exists, and the password is correct
    // const foundUserWithUsername = await this.authService.userRepository.findOne({
    //   where: {username: credentials.username},
    // });

    // //username takes precedence
    // if (credentials.username && foundUserWithUsername?.email) {
    //   credentials.username = foundUserWithUsername?.email;
    // }

    //redundant
    const user : User = await this.authService.verifyCredentials({
      username: credentials.username ?? '',
      password: credentials.password,
    });


    return this.authService.login(user);
  }

  @authenticate.skip()
  @response(200, {
    description: 'Let root user login to the system',
    content: {'application/json': {schema: TokenSchema}},
  })
  @post('/auth/login/root', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string'
                }
              },
            },
          },
        },
      },
    },
  })
  async rootLogin(
    @requestBody(CredentialsRequestBody)
      credentials: LoginCredentials,
  ): Promise<TokenObject | Error> {
    //redundant
    const user : User = await this.authService.verifyRootCredentials({
      username: credentials.username ?? '',
      password: credentials.password,
    });

    return this.authService.login(user);
  }

  @response(200, {
    type: 'string',
    description: 'User ID of the caller. Response is in plaintext format.',
  })
  @get('/auth/whoami')
  whoAmI(): any {
    // console.log("security id", securityId);
    // this._logger.log("info", "Calling who am I", securityId)
    console.debug("Who am I", this.userProfile[securityId])
    return {id: this.userProfile[securityId]};
  }
}
