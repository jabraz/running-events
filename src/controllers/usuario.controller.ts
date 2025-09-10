import { Request, Response } from "express";
import { usuarioService } from "../services/usuario.service";
import bcrypt from "bcrypt";
import { ROLES } from "../models/Usuario";

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.listar();
        res.json(usuarios);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.deletar(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário deletado com sucesso", usuario });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const alterarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { nome, email, senha, role } = req.body;

        let senhaHash;
        if (senha) senhaHash = await bcrypt.hash(senha, 10);

        if (role && !ROLES.includes(role))
            return res
                .status(400)
                .json({ error: `Role inválido. Os válidos são: ${ROLES.join(", ")}` });

        const usuarioAtualizado = await usuarioService.atualizar(id, {
            nome,
            email,
            senha: senhaHash,
            role,
        });

        if (!usuarioAtualizado) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
