import { inscricaoService } from "../services/inscricao.service";

export class RemoverInscricaoUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const inscricao = await inscricaoService.deletar(id);

        if (!inscricao) {
            throw new Error("Inscrição não encontrada");
        }

        return inscricao;
    }
}
