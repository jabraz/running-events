import { atletaService } from "../services/atleta.service";

export class RemoverAtletaUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const atleta = await atletaService.deletar(id);

        if (!atleta) {
            throw new Error("Atleta não encontrado");
        }

        return atleta;
    }
}
