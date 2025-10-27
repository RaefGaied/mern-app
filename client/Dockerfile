# Étape 1 
FROM node:lts-alpine
# Étape 2 
WORKDIR /app
# Étape 3 
COPY package*.json ./
# Étape 4 
RUN npm install
# Étape 5 
COPY . .
# Étape 6 
RUN npm run build
# Étape 7 
RUN npm install -g serve
# Étape 8 
EXPOSE 3000
# Étape 9 : Démarrer le serveur pour servir le build
CMD ["serve", "-s", "build", "-l", "3000"]
#trigger