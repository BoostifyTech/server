import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChapaModule } from 'chapa-nestjs';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChapaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secretKey = configService.get<string>('CHAPA_SECRET_KEY');

        if (!secretKey) {
          throw new Error(
            'CHAPA_SECRET_KEY is not defined in the environment variables',
          );
        }

        return {
          secretKey,
        };
      },
    }),
    UserModule,
    OrderModule,
    PaymentModule,
  ],
  exports: [ChapaModule],
})
export class AppModule {}
