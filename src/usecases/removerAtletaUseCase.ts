import { atletaService } from "../services/atleta.service";
import { inscricaoService } from "../services/inscricao.service";

export class RemoverAtletaUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const inscricaoVinculada = await inscricaoService.buscarPorAtletaId(id);

        if (inscricaoVinculada) {
            throw new Error("Este atleta possui inscrições vinculadas");
        }

        const atleta = await atletaService.deletar(id);

        if (!atleta) {
            throw new Error("Atleta não encontrado");
        }

        return atleta;
    }
}
