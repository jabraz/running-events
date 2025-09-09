import { Router } from "express";
import { criarAtleta, listarAtletas, deletarAtleta, alterarAtleta } from "../controllers/atleta.controller";

const router = Router();

router.post("/", criarAtleta);
router.get("/", listarAtletas);
router.delete("/delete/:id", deletarAtleta);
router.put("/update/:id", alterarAtleta);

export default router;