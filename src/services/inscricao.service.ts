import Inscricao, { IInscricao } from "../models/Inscricao";

export const inscricaoService = {
    criar: async (dados: Partial<IInscricao>) => {
        const inscricao = new Inscricao(dados);
        return inscricao.save();
    },

    listar: async () => Inscricao.find(),

    buscarPorId: async (id: string) => Inscricao.findById(id),

    atualizar: async (id: string, dados: Partial<IInscricao>) =>
        Inscricao.findByIdAndUpdate(id, dados, { new: true }),

    deletar: async (id: string) => Inscricao.findByIdAndDelete(id),

    checarInscricao: async (atletaId: string, eventoId: string) => {
        return Inscricao.findOne({ atletaId: atletaId, eventoId: eventoId });
    },
};
