const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Starting server...");
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

// Middleware para parsing JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Rota específica para a raiz
app.get("/", (req, res) => {
  console.log("Serving index.html for root path");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Servir arquivos estáticos da pasta raiz (apenas arquivos específicos)
app.use(
  express.static(__dirname, {
    index: false, // Não servir index.html automaticamente
    setHeaders: (res, path) => {
      // Definir headers apropriados para arquivos estáticos
      if (path.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html");
      }
    },
  })
);

// Rota principal - servir o index.html para todas as rotas não encontradas (SPA)
app.get("*", (req, res) => {
  console.log("Serving index.html for:", req.path);
  console.log("Current directory:", __dirname);
  console.log("Index file exists:", require('fs').existsSync(path.join(__dirname, "index.html")));
  
  try {
    const indexPath = path.join(__dirname, "index.html");
    console.log("Attempting to serve:", indexPath);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error loading page: " + err.message);
      } else {
        console.log("Successfully served index.html");
      }
    });
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).send("Error loading page: " + error.message);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// 404 handler - fallback para SPA (removido - conflita com rota *)
// app.use((req, res) => {
//   console.log("404 handler triggered for:", req.path);
//   res.status(200).sendFile(path.join(__dirname, "index.html"));
// });

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`❤️ Health check: http://localhost:${PORT}/health`);
  console.log(`📁 Diretório: ${__dirname}`);
  console.log(`🔧 NODE_ENV: ${process.env.NODE_ENV || "development"}`);
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
