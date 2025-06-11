import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Requisiciones {
  @PrimaryGeneratedColumn()
  requisicion_id: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  fecha_elaboracion: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  fecha_recepcion: Date;

  @Column()
  encabezado: string;

  @Column()
  clave_presupuestal: string;

  @Column()
  partida: number;

  @Column({ default: 0 })
  total: number;

  @Column({ default: 0 })
  pagado: number;

  @Column({ default: 0 })
  cambio: number;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
