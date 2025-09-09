import { Request, Response } from "express";
import { eventoService } from "../services/evento.service";

export const criarEvento = async (req: Request, res: Response) => {
  try {
    const evento = await eventoService.criar(req.body);
    res.status(201).json(evento);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const listarEventos = async (req: Request, res: Response) => {
  try {
    const evento = await eventoService.listar();
    res.json(evento);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const evento = await eventoService.deletar(id);

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.json({ message: "Evento deletado com sucesso", evento: evento });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const alterarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventoAtualizado = await eventoService.atualizar(id, req.body);

    if (!eventoAtualizado) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.json({ message: "Evento atualizado com sucesso", evento: eventoAtualizado });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
