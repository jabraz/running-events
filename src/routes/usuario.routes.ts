import { Router } from "express";
import { listarUsuarios, deletarUsuario, alterarUsuario } from "../controllers/usuario.controller";
import { autorizar } from "../middlewares/auth.middleware";
import { ADMIN, ATLETA, ORGANIZADOR } from "../models/Usuario";

const router = Router();

router.get("/", autorizar([ADMIN, ORGANIZADOR]), listarUsuarios);
router.delete("/delete/:id", deletarUsuario);
router.put("/update/:id", alterarUsuario);

export default router;
