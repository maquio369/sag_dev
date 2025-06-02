import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column()
  rol_id: number;

  @Column({ nullable: false })
  nombres: string;

  @Column({ nullable: false })
  apellidos: string;

  @Column()
  correo: string;

  @Column({ nullable: false })
  usuario: string;

  @Column({ nullable: false })
  clave: string;

  @Column()
  foto: string;

  @Column()
  empleado_id: number;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;

}
/*//usuarios
{
  "rol_id": 1,
  "nombres": "Itzel",
  "apellidos": "Balam kanan",
  "correo": "jperex0002@gmail.com",
  "usuario": "balam",
  "clave": "321654",
  "foto": null,
  "empleado_id": null,
  "esta_activo": true
}*/