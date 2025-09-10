import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ApiKeyGuard } from './auth/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
    }),
  ],
  controllers: [ProxyController],
  providers: [ApiKeyGuard],
})
export class AppModule { }
