import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empleados {
  @PrimaryGeneratedColumn()
  empleado_id: number;

  @Column()
  puesto_id: number;

  @Column({ nullable: false })
  numero_documento: string;

  @Column({ nullable: false })
  nombres: string;

  @Column({ nullable: false })
  apellidos: string;

  @Column()
  telefono: string;

  @Column()
  prefijo: string;

  @Column()
  correo: string;

  @Column()
  area_id: number;

  @Column()
  lugar_fisico_trabajo_id: number;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;

}
