import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permisos {
  @PrimaryGeneratedColumn()
  permiso_id: number;

  @Column()
  sistema_id: number;

  @Column()
  padre_id: number;

  @Column()
  url: string;

  @Column()
  orden: number;

  @Column()
  icono: string;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;

}
