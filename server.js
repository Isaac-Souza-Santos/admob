const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir arquivos estáticos do diretório atual
app.use(express.static(__dirname));

// Rota de teste
app.get("/test", (req, res) => {
  res.json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    files: fs.readdirSync(__dirname),
  });
});

// Rota principal - servir o index.html
app.get("/", (req, res) => {
  console.log("Requisição para rota principal recebida");

  const indexPath = path.join(__dirname, "index.html");
  console.log("Caminho do index.html:", indexPath);
  console.log("Arquivo existe?", fs.existsSync(indexPath));

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("Arquivo index.html não encontrado!");
    res.status(404).send("Arquivo não encontrado");
  }
});

// Rota para todas as outras requisições - servir o index.html (SPA)
app.get("*", (req, res) => {
  console.log("Requisição para rota catch-all:", req.url);
  res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Diretório atual: ${__dirname}`);
  console.log(`Arquivos no diretório:`, fs.readdirSync(__dirname));
  console.log(
    `index.html existe:`,
    fs.existsSync(path.join(__dirname, "index.html"))
  );
});
