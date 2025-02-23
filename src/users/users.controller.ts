import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import addUserDto from './dto/addUserDto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('getAll')
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('getById/:id')
    async getById(
        @Param('id')
        id:string
    ):Promise<User | null>{
        return this.usersService.findById(id);
    }

    @Post('create')
    async addUser(
        @Body()
        user: addUserDto
    ): Promise<User> {
        return this.usersService.create(user);
    }

    @Post('authenticate')
    async authenticateUser(
        @Body() body: { email: string; password: string }
    ): Promise<{ message: string; user?: User }> {
        try {
            const user = await this.usersService.findByEmailAndPassword(body.email, body.password);
            return { message: 'Authentication successful', user };
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
