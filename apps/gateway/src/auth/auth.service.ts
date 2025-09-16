import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string) {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      return {
        access_token: this.jwtService.sign({ username: decoded.username }, { expiresIn: '15m' }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
