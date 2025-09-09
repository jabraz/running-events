import mongoose, { Schema, Document } from "mongoose";

export interface IInscricao extends Document {
  atletaId: mongoose.Types.ObjectId;
  eventoId: mongoose.Types.ObjectId;
  categoria: string;
  criadoEm: Date;
}

const inscricaoSchema = new Schema<IInscricao>({
  atletaId: { type: Schema.Types.ObjectId, ref: "Atleta", required: true },
  eventoId: { type: Schema.Types.ObjectId, ref: "Evento", required: true },
  categoria: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model<IInscricao>("Inscricao", inscricaoSchema);
