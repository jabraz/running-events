import { usuarioService } from "../services/usuario.service";

export class ListarUsuariosUseCase {
    async execute() {
        const usuarios = await usuarioService.listar();
        return usuarios;
    }
}
