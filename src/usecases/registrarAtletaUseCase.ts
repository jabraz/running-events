import Atleta from "../models/Atleta";
import Usuario from "../models/Usuario";
import { atletaService } from "../services/atleta.service";

export class RegistrarAtletaUseCase {
    async execute(dados: any) {
        const { usuarioId } = dados;

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            throw new Error("Usuário vinculado não existe");
        }

        const atletaExistente = await Atleta.findOne({ usuarioId });
        if (atletaExistente) {
            throw new Error("Já existe um atleta vinculado a este usuário");
        }

        const atleta = await atletaService.criar(dados);

        return atleta;
    }
}
