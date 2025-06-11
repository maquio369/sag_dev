import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Productos {
  @PrimaryGeneratedColumn()
  producto_id: number;

  @Column({ comment: 'Código' })
  codigo: string;

  @Column({ nullable: false })
  producto: string;

  @Column({ default: 0 })
  stock_total: number;

  @Column()
  unidad_de_medida_id: number;

  @Column()
  precio_compra: number;

  @Column()
  precio_venta: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  foto_url: string;

  @Column()
  categoria_id: number;

  @Column()
  producto_estatus_id: number;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
