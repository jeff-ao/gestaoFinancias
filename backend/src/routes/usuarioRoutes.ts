import { Request, Response } from "express";
import { Router } from "express";
import usuarioController from "../controllers/usuarioController";
import transacaoController from "../controllers/transacaoController";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  usuarioController.cadastrarService(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  usuarioController.login(req, res);
});
router.get("/transacoes/:user_uuid", (req: Request, res: Response) => {
  transacaoController.getTransacoes(req, res);
});

export default router;
