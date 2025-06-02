import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  rol_id: number;

  @Column({ nullable: false })
  rol: string;

  @Column()
  abreviatura: string;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;

}
