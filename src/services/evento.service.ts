import Evento, { IEvento } from "../models/Evento";

export const eventoService = {
    criar: async (dados: Partial<IEvento>) => {
        const evento = new Evento(dados);
        return evento.save();
    },

    listar: async () => Evento.find(),

    buscarPorId: async (id: string) => Evento.findById(id),

    atualizar: async (id: string, dados: Partial<IEvento>) =>
        Evento.findByIdAndUpdate(id, dados, { new: true }),

    deletar: async (id: string) => Evento.findByIdAndDelete(id),
};
