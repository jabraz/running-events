import { eventoService } from "../services/evento.service";

export class AlterarEventoUseCase {
    async execute(dados: any) {
        const { id } = dados.params;

        const eventoAtualizado = await eventoService.atualizar(id, dados.body);

        if (!eventoAtualizado) {
            throw new Error("Evento não encontrado");
        }

        return eventoAtualizado;
    }
}
