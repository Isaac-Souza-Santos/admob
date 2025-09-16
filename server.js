const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rota principal - DEVE vir primeiro
app.get("/", (req, res) => {
  console.log("Servindo index.html");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Todas as outras rotas
app.get("*", (req, res) => {
  console.log("Catch-all route:", req.url);
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Arquivos:`, require("fs").readdirSync(__dirname));
});
