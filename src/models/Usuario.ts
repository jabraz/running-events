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
    role: Role;
}

const usuarioSchema = new Schema<IUsuario>({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: {
        type: String,
        enum: [ATLETA, ORGANIZADOR, ADMIN],
        default: ATLETA,
    },
});

export default mongoose.model<IUsuario>("Usuario", usuarioSchema);
