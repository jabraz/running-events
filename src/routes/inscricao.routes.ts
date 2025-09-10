import { Router } from "express";
import {
    criarInscricao,
    deletarInscricao,
    listarInscricoes,
} from "../controllers/inscricao.controller";

const router = Router();

router.post("/", criarInscricao);
router.get("/", listarInscricoes);
router.delete("/delete/:id", deletarInscricao);

export default router;
