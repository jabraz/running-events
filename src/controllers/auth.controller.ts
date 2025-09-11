import { Request, Response } from "express";
import { RegistrarUsuarioUsecase } from "../usecases/registrarUsuarioUseCase";
import { LoginUseCase } from "../usecases/loginUseCase";

export const registrar = async (req: Request, res: Response) => {
    try {
        const registrarUsuarioUseCase = new RegistrarUsuarioUsecase();
        const usuario = await registrarUsuarioUseCase.execute(req.body);
        res.status(201).json(usuario);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const loginUseCase = new LoginUseCase();
        const token = await loginUseCase.execute(req.body);
        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
