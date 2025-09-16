const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota para app-ads.txt
app.get("/app-ads.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "app-ads.txt"));
});

// Rota principal - servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Todas as outras rotas também servem o index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);

  // Mostrar URL correta baseada no ambiente
  if (process.env.NODE_ENV === "production") {
    console.log(`🌐 Aplicação disponível no Heroku`);
  } else {
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
  }
});
