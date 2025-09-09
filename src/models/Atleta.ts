import mongoose, { Document, Schema } from "mongoose";

type TempoPrevisto = `${number}${number}:${number}${number}:${number}${number}`;

export interface IAtleta extends Document {
  nome: string;
  sexo: string;
  cpf: string;
  email: string;
  telefone: string;
  cidade: string;
  equipe: string;
  tempoPrevisto: TempoPrevisto;
  dataNascimento: Date;
  criadoEm: Date;
}

const atletaSchema = new Schema<IAtleta>({
  nome: { type: String, required: true },
  sexo: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  cidade: { type: String, required: true },
  equipe: { type: String, required: true },
  tempoPrevisto: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  criadoEm: { type: Date, default: Date.now },
});

const Atleta = mongoose.model<IAtleta>("Atleta", atletaSchema);
export default Atleta;
