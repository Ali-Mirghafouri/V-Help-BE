import {injectable, /* inject, */ BindingScope, inject, service} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {
  RefreshtokenService,
  TokenServiceBindings,
  User,
  UserCredentials,
  UserRepository,
} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {SchoolAdminRepository, VolunteerRepository} from '../repositories';
import {SchoolAdmin, User as VHUser, Volunteer} from '../models';
import {TokenService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @repository(SchoolAdminRepository)
    public adminRepository : SchoolAdminRepository,
    @repository(VolunteerRepository)
    public volunteerRepo : VolunteerRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService : TokenService,
    @service(RefreshtokenService)
    public refreshService: RefreshtokenService,
  ) {}

  async create(
    email: string,
    password: string,
    userData : Partial<VHUser>,
    type : 'admin' | 'volunteer'
  ){
    const pwdHash = await hash(password, await genSalt());
    const userRepo = type === 'admin' ? this.adminRepository : this.volunteerRepo;
    const existingUser = await userRepo.findOne({
      where: {email}
    })

    if(existingUser){
      throw new Error("User already exists!");
    }

    if(userData.username === 'root'){
      throw new Error("Cannot create an account with 'root' username");
    }

    const userAccount = new VHUser({
      ...userData,
      password: "",
    });

    const savedAccount = await userRepo.create(userAccount);

    const user = await this.userRepository.create({
      username: savedAccount.username,
      email: savedAccount.email,
      realm: "email"
    })

    let userCreds!: UserCredentials;
    if (user.getId()) {
      userCreds = await this.userRepository
        .userCredentials(user.getId())
        .create({password: pwdHash});
    }

    if (!userCreds.id && user.getId()) {
      await this.userRepository.deleteById(user.getId());
    }

    return savedAccount;
  }


  async login(user: User) {
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile: UserProfile = this.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    // await this.jwtService.verifyToken(token);

    // this._logger.info("AuthService: User authenticated ", userProfile);
    // console.log("User authenticated", userProfile);
    const tokens = await this.refreshService.generateToken(
      userProfile,
      token
    );
    return tokens;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.getId().toString(),
      name: user.username,
      id: user.getId(),
      email: user.email,
    };
  }

  async verifyCredentials(credentials: {password: string; username: string}) {
    const invalidCredentialsError = 'Invalid email or password.';
    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError + " User not found");
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError+ " Credentials not found");
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError + " Password mismatch");
    }

    return foundUser;
  }

  async verifyRootCredentials(credentials: {password: string; username: string}) {
    const invalidCredentialsError = 'Invalid email or password.';

    let foundUser = await this.userRepository.findOne({
      where: {username: 'root'},
    });

    if (!foundUser) {
      foundUser = await this.userRepository.create({
        username: 'root',
        email: 'root@system.com'
      } as User)
      // throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    //This is just for testing purpose. We're not really gonna store the root password here
    if(credentials.password !== 'root1234'){
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }
}
