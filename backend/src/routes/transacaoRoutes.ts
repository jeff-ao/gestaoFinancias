import { Request, Response } from "express";
import transacaoController from "../controllers/transacaoController";
import Router from "express";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  transacaoController.postTransacao(req, res);
});
router.delete("/:uuid", async (req: Request, res: Response) => {
  transacaoController.deleteTransacao(req, res);
});
export default router;
