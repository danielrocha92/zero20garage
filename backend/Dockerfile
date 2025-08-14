# Use Node oficial
FROM node:18-slim

# Instalar dependências do Chromium
RUN apt-get update && apt-get install -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
  libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  fonts-liberation wget ca-certificates --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# Copia restante
COPY . .

# Expor porta
EXPOSE 4001
CMD ["node", "pdf-server.js"]
