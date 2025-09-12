import { Request, Response } from "express";
import { RemoverUsuarioUseCase } from "../usecases/removerUsuarioUseCase";
import { AlterarUsuarioUseCase } from "../usecases/alterarUsuarioUseCase";
import { ListarUsuariosUseCase } from "../usecases/listarUsuariosUseCase";

export const listarUsuarios = async (_: Request, res: Response) => {
    try {
        const listarUsuariosUseCase = new ListarUsuariosUseCase();
        const usuarios = await listarUsuariosUseCase.execute();
        res.json(usuarios);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    try {
        const removerUsuarioUseCase = new RemoverUsuarioUseCase();
        const usuarioRemovido = await removerUsuarioUseCase.execute(req.params);
        res.json({ message: "Usuário deletado com sucesso", usuarioRemovido });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const alterarUsuario = async (req: Request, res: Response) => {
    try {
        const alterarUsuarioUseCase = new AlterarUsuarioUseCase();
        const usuarioAtualizado = await alterarUsuarioUseCase.execute(req);
        res.json({ message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
