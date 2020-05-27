import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(
        private service: MensajesService
    ){}

    @Post()
    create(@Body() createMensaheDto: CreateMensajeDto, @Res() response) {
        this.service.createMensaje(createMensaheDto).then(
            mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json('Error en la creacion del mensaje')
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll().then(
            mensajes => {
                response.status(HttpStatus.OK).json(mensajes);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json('Error obteniendo los mensajes');
            });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.service.updateMensaje(idMensaje, updateMensajeDto).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json('Error en la actualizacion del mensaje');
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.service.deleteMensaje(idMensaje).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json('Error en la eliminacion del mensaje');
            });
    }
}
