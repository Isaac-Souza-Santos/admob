const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`
  );
  next();
});

// Rota de teste - DEVE vir ANTES do express.static
app.get("/test", (req, res) => {
  console.log("Rota /test chamada!");
  res.json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    files: fs.readdirSync(__dirname),
    port: PORT,
    dirname: __dirname,
  });
});

// Rota principal - DEVE vir ANTES do express.static
app.get("/", (req, res) => {
  console.log("Rota principal / chamada!");
  const indexPath = path.join(__dirname, "index.html");
  console.log("Caminho do index.html:", indexPath);
  console.log("Arquivo existe?", fs.existsSync(indexPath));

  if (fs.existsSync(indexPath)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(indexPath);
  } else {
    console.error("Arquivo index.html não encontrado!");
    res.status(404).send("Arquivo não encontrado");
  }
});

// Servir arquivos estáticos - DEVE vir DEPOIS das rotas específicas
app.use(express.static(__dirname));

// Rota catch-all para SPA - DEVE vir por último
app.get("*", (req, res) => {
  console.log("Rota catch-all chamada para:", req.url);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Diretório atual: ${__dirname}`);
  console.log(`📄 Arquivos no diretório:`, fs.readdirSync(__dirname));
  console.log(
    `✅ index.html existe:`,
    fs.existsSync(path.join(__dirname, "index.html"))
  );
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});
