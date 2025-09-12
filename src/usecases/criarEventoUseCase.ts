import { eventoService } from "../services/evento.service";

export class CriarEventoUseCase {
    async execute(dados: any) {
        const evento = await eventoService.criar(dados);

        return evento;
    }
}
