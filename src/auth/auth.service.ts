import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Authenticate, Role } from './interface/Role';
import { AuthenticationDto } from './dto/authentictaion.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    users = [
        {
            id: faker.datatype.uuid(),
            userName: 'bouakram',
            password: 'bouakram',
            Role: Role.Admin,
        },
        {
            id: faker.datatype.uuid(),
            userName: 'akbou',
            password: 'akbou',
            Role: Role.User,
        },
    ]

    authenticate(authenticationDto: AuthenticationDto): Authenticate {
        const user = this.users.find(
            (u) => u.userName === authenticationDto.userName && u.password === authenticationDto.password
        )

        if (!user) throw new NotFoundException('invalid credentials')

        const token = sign({ ...user }, 'secrete')

        return { token, user }
    }

}
