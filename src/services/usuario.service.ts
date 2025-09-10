import Usuario, { IUsuario } from "../models/Usuario";

export const usuarioService = {
    criar: async (dados: Partial<IUsuario>) => {
        const usuario = new Usuario(dados);
        return usuario.save();
    },

    listar: async () => Usuario.find(),

    buscarPorId: async (id: string) => Usuario.findById(id),

    atualizar: async (id: string, dados: Partial<IUsuario>) =>
        Usuario.findByIdAndUpdate(id, dados, { new: true }),

    deletar: async (id: string) => Usuario.findByIdAndDelete(id),
};
