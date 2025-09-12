import { eventoService } from "../services/evento.service";

export class RemoverEventoUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const evento = await eventoService.deletar(id);

        if (!evento) {
            throw new Error("Evento não encontrado");
        }

        return evento;
    }
}
