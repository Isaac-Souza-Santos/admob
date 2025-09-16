# Portfolio Isaac Souza

## 🚀 Deploy no Heroku

### Pré-requisitos

- Conta no [Heroku](https://heroku.com)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado
- [Git](https://git-scm.com/) instalado

### Passos para Deploy

1. **Clone o repositório** (se ainda não tiver):

   ```bash
   git clone <seu-repositorio>
   cd admob
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Teste localmente**:

   ```bash
   npm start
   ```

   Acesse: http://localhost:3000

4. **Faça login no Heroku**:

   ```bash
   heroku login
   ```

5. **Crie um app no Heroku**:

   ```bash
   heroku create seu-app-name
   ```

6. **Configure o repositório Git**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

7. **Conecte com o Heroku**:

   ```bash
   heroku git:remote -a seu-app-name
   ```

8. **Faça o deploy**:

   ```bash
   git push heroku main
   ```

9. **Abra o app**:
   ```bash
   heroku open
   ```

### Estrutura do Projeto

```
├── index.html          # Página principal do portfolio
├── app-ads.txt         # Arquivo para Google AdSense
├── server.js           # Servidor Express para servir arquivos estáticos
├── package.json        # Configurações do Node.js
├── Procfile           # Configuração para o Heroku
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Este arquivo
```

### Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Deploy**: Heroku
- **AdSense**: Google AdSense (app-ads.txt)

### Comandos Disponíveis

- `npm start` - Inicia o servidor de produção
- `npm run dev` - Inicia o servidor de desenvolvimento

### Configurações do Heroku

O projeto está configurado para:

- Usar Node.js como runtime
- Servir arquivos estáticos via Express
- Usar a porta definida pela variável de ambiente `PORT`
- Incluir suporte ao Google AdSense

### Suporte

Para dúvidas ou problemas, entre em contato:

- Email: souza-sjc@hotmail.com
- LinkedIn: [Isaac Souza](http://www.linkedin.com/in/isaacsouzasantos)
- GitHub: [Isaac-Exon](https://github.com/Isaac-Exon)
