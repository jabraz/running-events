import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import { usuarioService } from "../services/usuario.service";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export const registrar = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha, role } = req.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.criar({ nome, email, senha: senhaHash, role });

        res.status(201).json(usuario);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ id: usuario._id, email: usuario.email, role: usuario.role }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
