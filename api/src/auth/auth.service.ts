import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { AuthLoginDto } from './dto/auth.login.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtUser } from './types/auth.jwt.interface';
import { managerAccessMarks } from './types/auth.manager.access';
import { UserRole } from 'src/users/types/user.role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthLoginDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: authDto.email, password: authDto.password },
    });

    if (!user) {
      throw new BadRequestException('Login failed');
    }
    const jwtUser: IJwtUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // insert to manager role only student 1 and student 2
    if (user.role === UserRole.MANAGER) {
      jwtUser.specificUsersIds = await this.findSpecificUsersIds();
    }

    const token = this.jwtService.sign(jwtUser);
    return { token };
  }

  async findSpecificUsersIds(): Promise<number[]> {
    const users = await this.usersRepository.find({
      where: {
        name: In(managerAccessMarks),
      },
      select: {
        id: true,
      },
    });

    return users.map((user) => user.id);
  }
}
