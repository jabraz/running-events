import { Request, Response } from "express";
import { RegistrarAtletaUseCase } from "../usecases/registrarAtletaUseCase";
import { ListarAtletasUseCase } from "../usecases/listarAtletasUseCase";
import { RemoverAtletaUseCase } from "../usecases/removerAtletaUseCase";
import { AlterarAtletaUseCase } from "../usecases/alterarAtletaUseCase";

export const criarAtleta = async (req: Request, res: Response) => {
    try {
        const registrarAtletaUseCase = new RegistrarAtletaUseCase();
        const atleta = await registrarAtletaUseCase.execute(req.body);
        res.status(201).json(atleta);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const listarAtletas = async (_: Request, res: Response) => {
    try {
        const listarAtletasUseCase = new ListarAtletasUseCase();
        const atletas = await listarAtletasUseCase.execute();
        res.json(atletas);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarAtleta = async (req: Request, res: Response) => {
    try {
        const removerAtletaUseCase = new RemoverAtletaUseCase();
        const atletaRemovido = await removerAtletaUseCase.execute(req.params);
        res.json({ message: "Atleta deletado com sucesso", atletaRemovido });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const alterarAtleta = async (req: Request, res: Response) => {
    try {
        const alterarAtletaUseCase = new AlterarAtletaUseCase();
        const atletaAtualizado = await alterarAtletaUseCase.execute(req);
        res.json({ message: "Atleta atualizado com sucesso", atleta: atletaAtualizado });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
