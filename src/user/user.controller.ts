import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
//import { CreateUserDto } from './dto/create-user.dto';
interface TelegramUser {
  id: number;
  username?: string;
  photo_url?: string;
}
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() telegramUser: TelegramUser) {
    const dto = {
      id: telegramUser.id.toString(),
      username: telegramUser.username,
      imageUri: telegramUser.photo_url,
    };
    return this.userService.create(dto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 👇 Place this BEFORE @Get(':id') to avoid conflict
  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    return this.userService.getBalance(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
