const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Starting server...");
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    port: PORT,
    nodeEnv: process.env.NODE_ENV,
  });
});

// Rota para app-ads.txt (Google AdSense)
app.get("/app-ads.txt", (req, res) => {
  console.log("Serving app-ads.txt");
  try {
    res.sendFile(path.join(__dirname, "app-ads.txt"));
  } catch (error) {
    console.error("Error serving app-ads.txt:", error);
    res.status(404).send("File not found");
  }
});

// Rota para verificação do Google Search Console
app.get("/google6ea14f55b40fafcd.html", (req, res) => {
  console.log("Serving Google verification file");
  try {
    res.sendFile(path.join(__dirname, "google6ea14f55b40fafcd.html"));
  } catch (error) {
    console.error("Error serving Google verification file:", error);
    res.status(404).send("File not found");
  }
});

// Rota principal - servir o index.html
app.get("/", (req, res) => {
  console.log("Serving index.html");
  try {
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).send("Error loading page");
  }
});

// Servir arquivos estáticos da pasta raiz (deve vir por último)
app.use(express.static(__dirname));

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Internal server error");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`❤️ Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Diretório: ${__dirname}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});
