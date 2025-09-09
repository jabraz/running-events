import { Request, Response } from "express";
import { CriarInscricaoUseCase } from "../usecases/criarInscricaoUseCase";
import { inscricaoService } from "../services/inscricao.service";

const criarInscricaoUseCase = new CriarInscricaoUseCase();

export const criarInscricao = async (req: Request, res: Response) => {
  try {
    const { atletaId, eventoId, categoria } = req.body;
    const inscricao = await criarInscricaoUseCase.execute({ atletaId, eventoId, categoria });
    res.status(201).json(inscricao);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const listarInscricoes = async (req: Request, res: Response) => {
  try {
    const inscricao = await inscricaoService.listar();
    res.json(inscricao);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletarInscricao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inscricao = await inscricaoService.deletar(id);

    if (!inscricao) {
      return res.status(404).json({ error: "Inscrição não encontrada" });
    }

    res.json({ message: "Inscrição deletada com sucesso", inscricao: inscricao });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};