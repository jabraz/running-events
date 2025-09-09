import { Request, Response } from "express";
import { atletaService } from "../services/atleta.service";

export const criarAtleta = async (req: Request, res: Response) => {
  try {
    const atleta = await atletaService.criar(req.body);
    res.status(201).json(atleta);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const listarAtletas = async (req: Request, res: Response) => {
  try {
    const atletas = await atletaService.listar();
    res.json(atletas);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletarAtleta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const atleta = await atletaService.deletar(id);

    if (!atleta) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.json({ message: "Atleta deletado com sucesso", atleta });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const alterarAtleta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const atletaAtualizado = await atletaService.atualizar(id, req.body);

    if (!atletaAtualizado) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }

    res.json({ message: "Atleta atualizado com sucesso", atleta: atletaAtualizado });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
