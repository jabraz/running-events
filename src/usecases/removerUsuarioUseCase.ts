import { atletaService } from "../services/atleta.service";
import { usuarioService } from "../services/usuario.service";

export class RemoverUsuarioUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const atletaViculado = await atletaService.buscarPorUsuarioId(id);

        if (atletaViculado) {
            throw new Error(
                `Este usuário está vinculado ao atleta ${atletaViculado._id} (${atletaViculado.nome})`,
            );
        }

        const usuario = await usuarioService.deletar(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }
}
