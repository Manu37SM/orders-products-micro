// src/controllers/orders.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrdersService } from '../services/service';
import { Order } from '../entities/orders-entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) { }

  @Post()
  create(@Body() dto: { customer: { name: string; phone: string }; products: { productCode: string; qty: number; rate: number }[] }) {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order | null> {
    return this.service.findOne(id);
  }
}
