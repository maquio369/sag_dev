import { Entity, Column } from 'typeorm';

@Entity()
export class Errores {
  @Column({ nullable: false })
  statusCode: number;
  @Column()
  message: string;
}
