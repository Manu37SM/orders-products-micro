import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import proxy from 'express-http-proxy';
import { ApiKeyGuard } from './auth/api-key.guard';

const PRODUCTS_URL = process.env.PRODUCTS_URL || 'http://products:3001';
const ORDERS_URL = process.env.ORDERS_URL || 'http://orders:3002';

@Controller()
@UseGuards(ApiKeyGuard)
export class ProxyController {
  // --- PRODUCTS ---

  @All('products/*')
  proxyProducts(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    return proxy(PRODUCTS_URL, {
      proxyReqPathResolver: () => req.originalUrl,
    })(req, res, next);
  }

  @All('products')
  proxyProductsRoot(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    return proxy(PRODUCTS_URL, {
      proxyReqPathResolver: () => req.originalUrl,
    })(req, res, next);
  }

  // --- ORDERS ---

  @All('orders/*')
  proxyOrders(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    return proxy(ORDERS_URL, {
      proxyReqPathResolver: () => req.originalUrl,
    })(req, res, next);
  }

  @All('orders')
  proxyOrdersRoot(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    return proxy(ORDERS_URL, {
      proxyReqPathResolver: () => req.originalUrl,
    })(req, res, next);
  }
}