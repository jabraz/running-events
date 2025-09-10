import mongoose, { Schema, Document } from "mongoose";

export interface IEvento extends Document {
    nome: string;
    data: Date;
    local: string;
    categorias: string[];
    criadoEm: Date;
}

const eventoSchema = new Schema<IEvento>({
    nome: { type: String, required: true },
    data: { type: Date, required: true },
    local: { type: String, required: true },
    categorias: { type: [String], required: true },
    criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model<IEvento>("Evento", eventoSchema);
