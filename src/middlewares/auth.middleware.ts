import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUsuario } from "../models/Usuario";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).usuario = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

export function autorizar(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = (req as any).usuario as IUsuario;
        if (!usuario || !roles.includes(usuario.role)) {
            return res.status(403).json({ error: "Acesso negado" });
        }
        next();
    };
}
