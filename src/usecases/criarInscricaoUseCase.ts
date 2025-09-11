import Inscricao, { IInscricao } from "../models/Inscricao";
import { atletaService } from "../services/atleta.service";
import { eventoService } from "../services/evento.service";
import { inscricaoService } from "../services/inscricao.service";

export class CriarInscricaoUseCase {
    async execute(dados: any): Promise<IInscricao> {
        const { atletaId, eventoId, categoria } = dados;

        const atleta = await atletaService.buscarPorId(atletaId);
        if (!atleta) {
            throw new Error("Atleta não encontrado");
        }

        const inscricaoExistente = await inscricaoService.checarInscricao(
            dados.atletaId,
            dados.eventoId,
        );

        if (inscricaoExistente) {
            throw new Error("Atleta já está inscrito neste evento");
        }

        const evento = await eventoService.buscarPorId(eventoId);
        if (!evento) {
            throw new Error("Evento não encontrado");
        }

        if (!evento.categorias.includes(categoria)) {
            throw new Error("Categoria inválida para este evento");
        }

        const inscricao = await inscricaoService.criar(dados);

        return inscricao;
    }
}
