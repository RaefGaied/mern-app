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
EXPOSE 9000

# Étape 7 : Démarrer le serveur Express
CMD ["npm", "start"]
