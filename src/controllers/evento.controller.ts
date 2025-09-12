import { Request, Response } from "express";
import { eventoService } from "../services/evento.service";
import { CriarEventoUseCase } from "../usecases/criarEventoUseCase";
import { ListarEventosUseCase } from "../usecases/listarEventosUseCase";
import { RemoverEventoUseCase } from "../usecases/removerEventoUseCase";
import { AlterarEventoUseCase } from "../usecases/alterarEventoUseCase";

export const criarEvento = async (req: Request, res: Response) => {
    try {
        const criarEventoUseCase = new CriarEventoUseCase();
        const evento = await criarEventoUseCase.execute(req.body);
        res.status(201).json({ message: "Evento criado com sucesso", evento });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const listarEventos = async (_: Request, res: Response) => {
    try {
        const listarEventoUseCase = new ListarEventosUseCase();
        const evento = await listarEventoUseCase.execute();
        res.json(evento);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deletarEvento = async (req: Request, res: Response) => {
    try {
        const removerEventoUseCase = new RemoverEventoUseCase();
        const eventoRemovido = await removerEventoUseCase.execute(req.params);
        res.json({ message: "Evento deletado com sucesso", eventoRemovido });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const alterarEvento = async (req: Request, res: Response) => {
    try {
        const alterarEventoUseCase = new AlterarEventoUseCase();
        const eventoAtualizado = await alterarEventoUseCase.execute(req);
        res.json({ message: "Evento atualizado com sucesso", eventoAtualizado });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
