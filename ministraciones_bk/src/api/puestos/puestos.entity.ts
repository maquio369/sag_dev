import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Puestos {
  @PrimaryGeneratedColumn()
  puesto_id: number;
  @Column()
  puesto: string;
  @Column()
  esta_borrado: boolean;
}
