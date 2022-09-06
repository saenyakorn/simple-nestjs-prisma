import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(
      createUserDto.email,
      createUserDto.password,
      {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      },
    );
  }

  @Get()
  async findAll() {
    const targetUsers = await this.userService.findAll();
    return targetUsers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedUser = await this.userService.remove(id);
    return {
      message: `Removed #User${removedUser.id}, ${removedUser.firstName} ${removedUser.lastName}`,
    };
  }
}
