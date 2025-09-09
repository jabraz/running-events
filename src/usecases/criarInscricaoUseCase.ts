import Inscricao, { IInscricao } from "../models/Inscricao";
import { atletaService } from "../services/atleta.service";
import { eventoService } from "../services/evento.service";
import { inscricaoService } from "../services/inscricao.service";

export class CriarInscricaoUseCase {
    async execute(dados: {
        atletaId: string;
        eventoId: string;
        categoria: string;
    }): Promise<IInscricao> {
        // Verifica se atleta existe
        const atleta = await atletaService.buscarPorId(dados.atletaId);
        if (!atleta) {
            throw new Error("Atleta não encontrado");
        }

        // Verifica se o atleta já está inscrito neste evento
        const inscricaoExistente = await inscricaoService.checarInscricao(dados.atletaId, dados.eventoId);
        if (inscricaoExistente) {
            throw new Error("Atleta já está inscrito neste evento");
        }

        // Verifica se evento existe
        const evento = await eventoService.buscarPorId(dados.eventoId);
        if (!evento) {
            throw new Error("Evento não encontrado");
        }

        // Verifica se categoria é válida dentro do evento
        if (!evento.categorias.includes(dados.categoria)) {
            throw new Error("Categoria inválida para este evento");
        }

        const inscricao = new Inscricao(dados);
        return inscricao.save();
    }
}