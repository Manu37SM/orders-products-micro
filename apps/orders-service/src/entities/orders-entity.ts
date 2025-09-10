import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  customer: { name: string; phone: string };

  @Column({ type: 'jsonb' })
  products: { productCode: string; qty: number; rate: number }[];

  @Column({ type: 'numeric' })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;
}
