import { atletaService } from "../services/atleta.service";

export class AlterarAtletaUseCase {
    async execute(dados: any) {
        const { id } = dados.params;

        const atletaAtualizado = await atletaService.atualizar(id, dados.body);

        if (!atletaAtualizado) {
            throw new Error("Atleta não encontrado");
        }

        return atletaAtualizado;
    }
}
