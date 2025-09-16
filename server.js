const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Servir arquivos estáticos da pasta raiz
app.use(express.static(__dirname));

// Rota principal - servir o index.html
app.get("/", (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para app-ads.txt (Google AdSense)
app.get("/app-ads.txt", (req, res) => {
  console.log("Serving app-ads.txt");
  res.sendFile(path.join(__dirname, "app-ads.txt"));
});

// Rota para verificação do Google Search Console
app.get("/google6ea14f55b40fafcd.html", (req, res) => {
  console.log("Serving Google verification file");
  res.sendFile(path.join(__dirname, "google6ea14f55b40fafcd (3).html"));
});

// Rota de health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Rota para qualquer arquivo estático (CSS, JS, imagens, etc.)
app.get("*", (req, res) => {
  console.log(`Serving static file: ${req.path}`);
  res.sendFile(path.join(__dirname, req.path));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
