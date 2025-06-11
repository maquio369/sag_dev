import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductoEstatus {
  @PrimaryGeneratedColumn()
  producto_estatus_id: number;

  @Column({ nullable: false })
  estatus: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
