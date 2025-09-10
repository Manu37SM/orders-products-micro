// src/services/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) { }

  create(dto: Partial<Product>): Promise<Product> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findOne(idOrCode: string): Promise<Product> {
    const product = await this.repo.findOneBy([{ id: idOrCode }, { code: idOrCode }]);
    if (!product) throw new NotFoundException(`Product ${idOrCode} not found`);
    return product;
  }

  async update(id: string, dto: Partial<Product>): Promise<Product> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Product ${id} not found`);
  }
}