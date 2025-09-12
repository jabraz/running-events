import { Request, Response } from "express";
import { CriarInscricaoUseCase } from "../usecases/criarInscricaoUseCase";
import { ListarInscricoesUseCase } from "../usecases/listarInscricoesUseCase";
import { RemoverInscricaoUseCase } from "../usecases/removerInscricaoUseCase";

export const criarInscricao = async (req: Request, res: Response) => {
    try {
        const criarInscricaoUseCase = new CriarInscricaoUseCase();
        const inscricao = await criarInscricaoUseCase.execute(req.body);
        res.status(201).json({ message: "Inscrição realizada com sucesso", inscricao });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const listarInscricoes = async (_: Request, res: Response) => {
    try {
        const listarInscricoesUseCase = new ListarInscricoesUseCase();
        const inscricoes = await listarInscricoesUseCase.execute();
        res.json(inscricoes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarInscricao = async (req: Request, res: Response) => {
    try {
        const removerInscricaoUseCase = new RemoverInscricaoUseCase();
        const inscricaoRemovida = await removerInscricaoUseCase.execute(req.params);
        res.json({ message: "Inscrição deletada com sucesso", inscricaoRemovida });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
