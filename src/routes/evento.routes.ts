import { Router } from "express";
import { criarEvento, listarEventos, deletarEvento, alterarEvento } from "../controllers/evento.controller";

const router = Router();

router.post("/", criarEvento);
router.get("/", listarEventos);
router.delete("/delete/:id", deletarEvento);
router.put("/update/:id", alterarEvento);

export default router;