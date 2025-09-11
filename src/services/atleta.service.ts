import Atleta, { IAtleta } from "../models/Atleta";

export const atletaService = {
    criar: async (dados: Partial<IAtleta>) => {
        const atleta = new Atleta(dados);
        return atleta.save();
    },

    listar: async () => Atleta.find(),

    buscarPorId: async (id: string) => Atleta.findById(id),

    atualizar: async (id: string, dados: Partial<IAtleta>) =>
        Atleta.findByIdAndUpdate(id, dados, { new: true }),

    deletar: async (id: string) => Atleta.findByIdAndDelete(id),
};
