import { atletaService } from "../services/atleta.service";

export class ListarAtletasUseCase {
    async execute() {
        const atletas = await atletaService.listar();
        return atletas;
    }
}
