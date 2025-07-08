import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

interface TelegramUser {
  id: number;
  username?: string;
  photo_url?: string;
}
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // get telegram users
  @Post()
  create(@Body() telegramUser: TelegramUser) {
    const dto = {
      id: telegramUser.id.toString(),
      username: telegramUser.username,
      imageUri: telegramUser.photo_url,
    };
    return this.userService.create(dto);
  }
  //to get all users its for admin
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  // to get the balance by id
  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    return this.userService.getBalance(id);
  }
  //  to get the user by user id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
