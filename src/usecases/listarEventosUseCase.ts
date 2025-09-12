import { eventoService } from "../services/evento.service";

export class ListarEventosUseCase {
    async execute() {
        const evento = await eventoService.listar();

        return evento;
    }
}
