import { usuarioService } from "../services/usuario.service";

export class RemoverUsuarioUseCase {
    async execute(dados: any) {
        const { id } = dados;

        const usuario = await usuarioService.deletar(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }
}
