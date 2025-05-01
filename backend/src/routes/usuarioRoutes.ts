import { Request, Response } from "express";
import { Router } from "express";
import usuarioController from "../controllers/usuarioController";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  usuarioController.cadastrarService(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  usuarioController.login(req, res);
});

export default router;
