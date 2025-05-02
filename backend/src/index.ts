import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import transacaoRoutes from "./routes/transacaoRoutes";

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRoutes);
app.use("/transacoes", transacaoRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor ouvindo em http://localhost:${port}`);
});
