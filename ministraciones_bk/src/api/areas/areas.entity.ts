import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  area_id: number;

  @Column({ nullable: false })
  area: string;

  @Column()
  padre_id: number;

  @Column()
  responsable_area_id: number;

  @Column({ default: true })
  esta_borrado: boolean;

}
