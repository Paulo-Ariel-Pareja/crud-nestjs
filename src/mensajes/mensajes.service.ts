import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entity/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
    ) { }

    async getAll(): Promise<Mensaje[]>{
        return await this.mensajeRepository.find();
    }

    async createMensaje(data: CreateMensajeDto): Promise<Mensaje> {
        const mensaje = new Mensaje();
        mensaje.mensaje = data.mensaje;
        mensaje.nick = data.nick;

        return await this.mensajeRepository.save(mensaje);
    }

    async updateMensaje(id: number, data: CreateMensajeDto): Promise<Mensaje> {
        const mensaje = await this.mensajeRepository.findOne(id);
        mensaje.nick = data.nick;
        mensaje.mensaje = data.mensaje;

        return await this.mensajeRepository.save(mensaje);
    }

    async deleteMensaje(id: number): Promise<any>{
        return await this.mensajeRepository.delete(id);
    }
}
