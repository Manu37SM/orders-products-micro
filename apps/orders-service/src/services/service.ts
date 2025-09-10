// src/services/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/orders-entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) { }

  create(dto: { customer: { name: string; phone: string }; products: { productCode: string; qty: number; rate: number }[] }) {
    const totalAmount = dto.products.reduce((sum, p) => sum + Number(p.rate) * p.qty, 0);
    const entity = this.repo.create({ ...dto, totalAmount });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
