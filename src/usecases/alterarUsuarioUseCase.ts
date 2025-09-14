import bcrypt from "bcrypt";
import { usuarioService } from "../services/usuario.service";
import { ROLES } from "../models/Usuario";

export class AlterarUsuarioUseCase {
    async execute(dados: any) {
        const { id } = dados.params;
        const { nome, email, senha, roles } = dados.body;

        let senhaHash;
        if (senha) {
            senhaHash = await bcrypt.hash(senha, 10);
        }

        if (roles) {
            const invalidos = roles.filter((r: string) => !ROLES.includes(r));
            if (invalidos.length > 0) {
                throw new Error(
                    `Roles inválidos: ${invalidos.join(", ")}. Válidos: ${ROLES.join(", ")}`,
                );
            }
        }

        const usuarioAtualizado = await usuarioService.atualizar(id, {
            nome,
            email,
            senha: senhaHash,
            roles,
        });

        if (!usuarioAtualizado) {
            throw new Error("Usuário não encontrado");
        }

        return usuarioAtualizado;
    }
}
