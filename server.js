const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(
  express.static(__dirname, {
    index: false, // Não usar index.html automaticamente
    dotfiles: "ignore", // Ignorar arquivos ocultos
  })
);

// Rota de debug
app.get("/debug", (req, res) => {
  res.json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    port: PORT,
    files: require("fs").readdirSync(__dirname),
  });
});

// Rota para app-ads.txt
app.get("/app-ads.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "app-ads.txt"));
});

// Rota principal - servir index.html
app.get("/", (req, res) => {
  console.log("Rota principal acessada");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Todas as outras rotas também servem o index.html (SPA)
app.get("*", (req, res) => {
  console.log(`Rota catch-all acessada: ${req.path}`);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Tratamento de erro para arquivos não encontrados
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).send("Erro interno do servidor");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`📁 Diretório atual: ${__dirname}`);
  console.log(`📄 Arquivos disponíveis:`, require("fs").readdirSync(__dirname));

  // Mostrar URL correta baseada no ambiente
  if (process.env.NODE_ENV === "production") {
    console.log(`🌐 Aplicação disponível no Heroku`);
  } else {
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
  }
});
