import { inscricaoService } from "../services/inscricao.service";

export class ListarInscricoesUseCase {
    async execute() {
        const inscricoes = await inscricaoService.listar();
        return inscricoes;
    }
}
