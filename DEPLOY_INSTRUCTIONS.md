# 🚀 Instruções de Deploy no Heroku

## Problema: "There's nothing here, yet. Build something amazing"

Este erro geralmente acontece quando o Heroku não reconhece o app como Node.js ou há problemas no deploy.

## ✅ Solução Passo a Passo:

### 1. Verificar se está no diretório correto:

```bash
cd "C:\Área de Trabalho\Repositórios\admob"
```

### 2. Verificar se o Git está inicializado:

```bash
git status
```

Se não estiver inicializado:

```bash
git init
```

### 3. Adicionar todos os arquivos:

```bash
git add .
```

### 4. Fazer commit:

```bash
git commit -m "Initial commit with Node.js app"
```

### 5. Verificar se o Heroku CLI está instalado:

```bash
heroku --version
```

### 6. Fazer login no Heroku:

```bash
heroku login
```

### 7. Criar app no Heroku (substitua 'seu-app-name' por um nome único):

```bash
heroku create seu-app-name
```

### 8. Configurar buildpack Node.js:

```bash
heroku buildpacks:set heroku/nodejs
```

### 9. Fazer deploy:

```bash
git push heroku main
```

OU se estiver usando master:

```bash
git push heroku master
```

### 10. Verificar logs se houver erro:

```bash
heroku logs --tail
```

### 11. Abrir o app:

```bash
heroku open
```

## 🔍 Verificações Importantes:

1. **Verificar se o app está rodando:**

   - Acesse: `https://seu-app.herokuapp.com/health`
   - Deve retornar: `{"status":"OK","timestamp":"..."}`

2. **Verificar se o index.html está sendo servido:**

   - Acesse: `https://seu-app.herokuapp.com/`
   - Deve mostrar seu portfolio

3. **Verificar logs em tempo real:**
   ```bash
   heroku logs --tail
   ```

## 🛠️ Arquivos Criados para o Deploy:

- ✅ `package.json` - Configurações Node.js
- ✅ `server.js` - Servidor Express
- ✅ `Procfile` - Configuração Heroku
- ✅ `.buildpacks` - Buildpack Node.js
- ✅ `runtime.txt` - Versão Node.js
- ✅ `.gitignore` - Arquivos ignorados

## ❌ Problemas Comuns:

1. **"There's nothing here, yet"** = App não reconhecido como Node.js

   - Solução: Verificar buildpack e Procfile

2. **Erro de build** = Dependências não instaladas

   - Solução: Verificar package.json e npm install

3. **App não inicia** = Erro no server.js
   - Solução: Verificar logs com `heroku logs --tail`

## 📞 Se ainda não funcionar:

1. Verificar logs: `heroku logs --tail`
2. Verificar se o app está ativo: `heroku ps`
3. Reiniciar o app: `heroku restart`
4. Verificar buildpacks: `heroku buildpacks`
