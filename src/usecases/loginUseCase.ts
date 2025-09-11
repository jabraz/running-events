import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import { JWT_SECRET } from "../config/auth";

export class LoginUseCase {
    async execute(dados: any) {
        const { email, senha } = dados;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, role: usuario.role },
            JWT_SECRET,
            {
                expiresIn: "1h",
            },
        );

        return token;
    }
}
