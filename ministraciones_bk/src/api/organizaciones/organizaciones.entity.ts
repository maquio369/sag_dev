import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organizaciones {
  @PrimaryGeneratedColumn()
  organizacion_id: number;

  @Column()
  padre_id: number;

  @Column({ nullable: false })
  organizacion: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
