import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private jwtService = new JwtService({ secret: process.env.JWT_SECRET || 'my-secret' });

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // --- API Key check ---
    const key = req.headers['x-api-key'] || req.query.apiKey;
    const expectedKey = process.env.API_KEY || 'secret-api-key';

    if (!key || key !== expectedKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    // --- JWT check ---
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
    {
      throw new UnauthorizedException('JWT token missing');
    }

    try {
      const token = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(token);
      req.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return true;
  }
}
