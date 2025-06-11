import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  persona_id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  direccion: string;
  @Column()
  telefono: string;
  @Column()
  esta_borrado: boolean;
}

/*
  INSERT INTO public.persona(
	 nombre, apellido, direccion, telefono)
	VALUES ( 'Balam', 'kanan', 'Centro', '-');
  */
/*
 CREATE TABLE IF NOT EXISTS public.persona
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    nombre text COLLATE pg_catalog."default",
    apellido text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default",
    telefono text COLLATE pg_catalog."default",
    CONSTRAINT persona_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.persona
    OWNER to devs;
*/
/*
  constructor(
    id: number,
    name: string,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.updatedAt = updatedAt;
  }*/
