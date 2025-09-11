import bcrypt from "bcrypt";
import { usuarioService } from "../services/usuario.service";

export class RegistrarUsuarioUsecase {
    async execute(dados: any) {
        const { nome, email, senha, role } = dados;

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.criar({ nome, email, senha: senhaHash, role });

        return usuario;
    }
}
