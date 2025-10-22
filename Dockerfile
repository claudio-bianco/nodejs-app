# ===== Fase 1: build de dependências =====
FROM node:18-alpine AS deps
WORKDIR /app

# Copia apenas os manifestos primeiro para aproveitar cache
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm ci --only=production || npm i --only=production

# ===== Fase 2: execução (runtime) =====
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Instala utilitário básico para o healthcheck (opcional)
RUN apk add --no-cache wget

# Copia dependências já instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Copia o código-fonte
COPY src ./src

# Segurança: usa o usuário padrão não-root
USER node

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Healthcheck simples: verifica se o app está respondendo
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/ || exit 1

# Comando de inicialização
CMD ["node", "src/server.js"]