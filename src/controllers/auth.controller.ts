import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export const registrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = new Usuario({ nome, email, senha: senhaHash });
    await usuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
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

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, {
      expiresIn: "1h", // expira em 1 hora
    });

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};