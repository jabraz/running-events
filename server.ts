import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes";
import { autenticar } from "./src/middlewares/auth.middleware";
import atletaRoutes from "./src/routes/atleta.routes";
import eventoRoutes from "./src/routes/evento.routes";
import inscricaoRoutes from "./src/routes/inscricao.routes";
import usuarioRoutes from "./src/routes/usuario.routes";

dotenv.config();

const app = express();
app.use(express.json()); // para ler JSON no body

// Conectar ao MongoDB
mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error(err));

//Rotas públicas
app.use("/api/auth", authRoutes);

//Rotas protegidas
app.use("/api/atletas", autenticar, atletaRoutes);
app.use("/api/eventos", autenticar, eventoRoutes);
app.use("/api/inscricoes", autenticar, inscricaoRoutes);
app.use("/api/usuarios", autenticar, usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
