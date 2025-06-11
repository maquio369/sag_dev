import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categorias {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ nullable: false })
  categoria: string;

  @Column()
  ubicacion: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
