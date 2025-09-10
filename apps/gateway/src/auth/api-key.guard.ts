import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] || req.query.apiKey;
    const expectedKey = process.env.API_KEY || 'secret-api-key';

    if (!key || key !== expectedKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}