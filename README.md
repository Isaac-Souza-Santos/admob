# Portfolio Isaac Souza

Portfolio pessoal do Isaac Souza - Desenvolvedor Front-End.

## 🚀 Deploy no Heroku

### Pré-requisitos

- Conta no Heroku
- Heroku CLI instalado
- Git instalado

### Passos para Deploy

1. **Instalar dependências localmente (opcional):**

   ```bash
   npm install
   ```

2. **Testar localmente:**

   ```bash
   npm start
   ```

   Acesse: http://localhost:3000

3. **Fazer login no Heroku:**

   ```bash
   heroku login
   ```

4. **Criar aplicação no Heroku:**

   ```bash
   heroku create nome-da-sua-app
   ```

5. **Fazer deploy:**

   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push heroku main
   ```

6. **Abrir aplicação:**
   ```bash
   heroku open
   ```

### Estrutura do Projeto

```
├── index.html          # Página principal do portfolio
├── server.js           # Servidor Express para servir o HTML
├── package.json        # Dependências e scripts
├── Procfile           # Configuração do Heroku
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Este arquivo
```

### Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

### Funcionalidades

- Design responsivo
- Animações CSS
- Navegação suave
- Seções: Home, Sobre, Competências, Projetos, Contato
- Interatividade com JavaScript

---

Desenvolvido por Isaac Souza
