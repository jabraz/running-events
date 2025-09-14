import mongoose, { Schema, Document } from "mongoose";

export const ATLETA: string = "atleta";
export const ORGANIZADOR: string = "organizador";
export const ADMIN: string = "admin";

export const ROLES = [ATLETA, ORGANIZADOR, ADMIN];
export type Role = (typeof ROLES)[number];

export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    roles: Role[];
    criadoEm: Date;
    inExcluido: boolean;
}

const usuarioSchema = new Schema<IUsuario>({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    roles: {
        type: [String],
        enum: ROLES,
        default: [ATLETA],
    },
    criadoEm: { type: Date, default: Date.now },
    inExcluido: { type: Boolean, default: false },
});

export default mongoose.model<IUsuario>("Usuario", usuarioSchema);
