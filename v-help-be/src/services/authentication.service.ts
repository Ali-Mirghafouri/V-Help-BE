import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {UserRepository} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {SchoolAdminRepository, VolunteerRepository} from '../repositories';
import {SchoolAdmin, User as VHUser, Volunteer} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @repository(SchoolAdminRepository)
    public adminRepository : SchoolAdminRepository,
    @repository(VolunteerRepository)
    public volunteerRepo : VolunteerRepository
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

    const userAccount = new VHUser({
      ...userData,
      password: pwdHash,
    });

    const savedAccount = await userRepo.create(userAccount);

    return savedAccount;
  }
}
