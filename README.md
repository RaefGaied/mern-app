# 🚀 Application MERN Conteneurisée avec Docker & Docker Compose

## 📌 Objectif du Projet

Ce projet consiste à **conteneuriser une application MERN complète** (MongoDB, Express, React, Node.js) en utilisant **Docker** et **Docker Compose** pour orchestrer les différents services. L'objectif est de démontrer la capacité à :

- ✅ Créer des images Docker optimisées pour le frontend et le backend
- ✅ Configurer Docker Compose pour orchestrer plusieurs services
- ✅ Établir une communication réseau entre les conteneurs
- ✅ Gérer les variables d'environnement et les volumes
- ✅ Documenter et déployer l'application

---

## 🚀 Démarrage Rapide

### Étape 0️⃣ : Fork et Clone du Projet

#### 1. Forker le dépôt GitLab original

Accédez au dépôt original et cliquez sur le bouton **Fork** :

```
https://gitlab.com/devops_tps/mern-app
```

**Capture du fork :**
![Fork GitLab](screenshots/00_fork_gitlab.png)
*Dépôt forké sur votre compte GitLab/GitHub*

#### 2. Cloner votre fork

Clonez **votre fork** (et non le dépôt original) en utilisant l'URL SSH :

```bash
git clone git@github.com:<votre_utilisateur>/mern-app.git
cd mern-app
```

> ⚠️ Remplacez `<votre_utilisateur>` par votre nom d'utilisateur GitHub/GitLab

**Capture du repo cloné :**
![Repo Cloné](screenshots/00_repo_cloned.png)
*Dépôt cloné dans votre machine locale*

#### 3. Familiarisez-vous avec la structure

- `client/` → Application React
- `server/` → API Express
- `docker-compose.yml` → Configuration Docker

---

## 📁 Structure du Projet

```
mern-docker/
├── client/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   ├── src/
│   └── ...
├── server/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── routes/
│   ├── models/
│   └── ...
├── docker-compose.yml
├── README.md
└── screenshots/
    ├── 01_docker_build.png
    ├── 02_docker_ps.png
    ├── 03_server_logs.png
    ├── 04_client_page.png
    └── 05_network_inspect.png
```

---

## ⚙️ Étapes Réalisées

### 1️⃣ Création des Dockerfiles

#### **Backend (Express) - `server/Dockerfile`**
- Image de base : `node:lts-alpine` (légère et optimisée)
- Installation des dépendances avec `npm install`
- Exposition du port `9000`
- Commande de démarrage : `npm start`

#### **Frontend (React) - `client/Dockerfile`**
- Image de base : `node:lts-alpine`
- Installation des dépendances
- Build de l'application React avec `npm run build`
- Installation de `serve` pour servir l'application en production
- Exposition du port `3000`
- Commande de démarrage : `serve -s build -l 3000`

### 2️⃣ Configuration de Docker Compose

Le fichier `docker-compose.yml` définit trois services :

| Service | Port | Rôle |
|---------|------|------|
| **mongodb** | 27017 | Base de données MongoDB |
| **server** | 9000 | API Express (backend) |
| **client** | 3000 | Application React (frontend) |

**Caractéristiques principales :**
- 🔗 Réseau personnalisé `mern-network` pour la communication inter-conteneurs
- 📦 Volume pour MongoDB (`mongo_data`) pour la persistance des données
- 🔄 Dépendances entre services (`depends_on`)
- 🌍 Variables d'environnement configurées
- ✅ Health checks pour MongoDB

### 3️⃣ Construction et Lancement

```bash
# Construire les images et lancer les conteneurs
docker compose up --build

# Lancer sans reconstruction
docker compose up

# Lancer en arrière-plan
docker compose up -d
```

### 4️⃣ Vérification du Fonctionnement

Après le lancement, vérifiez que :

- ✅ **Frontend** : http://localhost:3000
- ✅ **Backend** : http://localhost:9000
- ✅ **MongoDB** : Accessible via `mongodb://admin:password@mongodb:27017/mern`

### 5️⃣ Arrêt et Nettoyage

```bash
# Arrêter les conteneurs
docker compose down

# Arrêter et supprimer les volumes
docker compose down -v
```

---

## 🖼️ Captures d'Écran

### 📸 1. Construction des Images Docker
![Docker Build](screenshots/01_docker_build.png)
*Terminal montrant la construction des images avec `docker compose up --build`*

---
![Docker Build](screenshots/vue dans docker.png)


### 📸 2. Conteneurs en Cours d'Exécution
![Docker PS](screenshots/02_docker_ps.png)
*Résultat de `docker ps` montrant les trois conteneurs actifs (mongodb, server, client)*

### 📸 3. Logs du Serveur Express
![Server Logs](screenshots/03_server_logs.png)
*Logs du serveur montrant la connexion réussie à MongoDB et le démarrage du serveur*

### 📸 4. Application React dans le Navigateur
![Client Page](screenshots/04_client_page.png)
*Page frontend React ouverte à http://localhost:3000*

### 📸 5. Inspection du Réseau Docker
![Network Inspect](screenshots/05_network_inspect.png)
*Résultat de `docker network inspect mern-network` montrant les conteneurs connectés*

---

## 📋 Commandes Utiles

```bash
# Lancer le projet
docker compose up --build

# Lancer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f

# Voir les logs d'un service spécifique
docker compose logs -f server
docker compose logs -f client
docker compose logs -f mongodb

# Vérifier les conteneurs actifs
docker ps

# Arrêter les conteneurs
docker compose down

# Arrêter et supprimer les volumes
docker compose down -v

# Inspecter le réseau
docker network inspect mern-network

# Accéder au shell d'un conteneur
docker exec -it server sh
docker exec -it client sh
docker exec -it mongodb mongosh
```

---

## 🔧 Configuration des Variables d'Environnement

### **Backend (.env ou docker-compose.yml)**
```
MONGO_URI=mongodb://admin:password@mongodb:27017/mern?authSource=admin
NODE_ENV=development
PORT=9000
```

### **Frontend (.env ou docker-compose.yml)**
```
REACT_APP_API_URL=http://localhost:9000
```

---

## 🌐 Communication Entre Conteneurs

Les conteneurs communiquent via le réseau `mern-network` :

- **Client → Server** : `http://server:9000` (depuis le conteneur)
- **Server → MongoDB** : `mongodb://admin:password@mongodb:27017/mern`
- **Client (navigateur) → Server** : `http://localhost:9000`

---

## 📚 Concepts Clés Démontrés

| Concept | Description |
|---------|-------------|
| **Dockerfile** | Définit comment construire une image Docker |
| **Docker Compose** | Orchestre plusieurs conteneurs |
| **Réseau Docker** | Permet la communication entre conteneurs |
| **Volumes** | Persiste les données entre les redémarrages |
| **Variables d'environnement** | Configure les services |
| **Health Checks** | Vérifie la santé des services |
| **Dépendances** | Contrôle l'ordre de démarrage |

---

## 🚀 Instructions pour Reproduire le TP

### Prérequis
- Docker installé et en cours d'exécution
- Docker Compose (inclus avec Docker Desktop)
- Git

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/<votre-utilisateur>/mern-docker.git
   cd mern-docker
   ```

2. **Construire et lancer les conteneurs**
   ```bash
   docker compose up --build
   ```

3. **Accéder à l'application**
   - Frontend : http://localhost:3000
   - Backend : http://localhost:9000

4. **Vérifier les logs**
   ```bash
   docker compose logs -f
   ```

5. **Arrêter l'application**
   ```bash
   docker compose down
   ```

---

## 📝 Fichiers Livrés

- ✅ `server/Dockerfile` - Image Docker pour le backend Express
- ✅ `client/Dockerfile` - Image Docker pour le frontend React
- ✅ `docker-compose.yml` - Configuration d'orchestration
- ✅ `README.md` - Documentation complète
- ✅ `screenshots/` - Captures d'écran illustrant le fonctionnement

---

## 👨‍💻 Auteur

**Raef Gaied**  
Étudiant en Informatique  
Faculté Polytechnique de Sousse

---

## 📄 Licence

Ce projet est fourni à titre éducatif pour le TP2 de Conteneurisation.

---

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez que Docker est en cours d'exécution
2. Consultez les logs : `docker compose logs`
3. Assurez-vous que les ports 3000, 9000 et 27017 sont disponibles

---

**Dernière mise à jour** : Octobre 2025
