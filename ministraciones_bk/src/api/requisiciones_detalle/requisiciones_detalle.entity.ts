import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequisicionesDetalle {
  @PrimaryGeneratedColumn()
  requisicion_detalle_id: number;

  @Column({ nullable: false })
  cantidad: number;

  @Column()
  observacion: string;

  @Column()
  producto_id: number;

  @Column()
  requisicion_id: number;

  @Column({ nullable: false })
  precio: number;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
