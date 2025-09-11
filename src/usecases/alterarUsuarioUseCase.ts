import bcrypt from "bcrypt";
import { usuarioService } from "../services/usuario.service";
import { ROLES } from "../models/Usuario";

export class AlterarUsuarioUseCase {
    async execute(dados: any) {
        const { id } = dados.params;

        const { nome, email, senha, role } = dados.body;

        let senhaHash;
        if (senha) senhaHash = await bcrypt.hash(senha, 10);

        if (role && !ROLES.includes(role))
            throw new Error(`Role inválido. Os válidos são: ${ROLES.join(", ")}`);

        const usuarioAtualizado = await usuarioService.atualizar(id, {
            nome,
            email,
            senha: senhaHash,
            role,
        });

        if (!usuarioAtualizado) {
            throw new Error("Usuário não encontrado");
        }

        return usuarioAtualizado;
    }
}
