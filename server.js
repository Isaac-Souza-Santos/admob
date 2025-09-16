const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da raiz
app.use(express.static("."));

// Rota principal - servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para o arquivo de verificação do Google
app.get("/google6ea14f55b40fafcd.html", (req, res) => {
  res.sendFile(path.join(__dirname, "google6ea14f55b40fafcd.html"));
});

// Rota para todas as outras requisições - redirecionar para o index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});
