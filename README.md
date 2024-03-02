# Film

Ce fichier README fournit les étapes nécessaires pour lancer et configurer le projet. Assurez-vous de suivre attentivement chaque étape pour garantir le bon fonctionnement du projet.

## Étapes pour lancer le projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/AuPicaud/film.git
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données MySQL avec Docker

```bash
docker run --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql --default-authentication-plugin=mysql_native_password -p 3306:3306 -d mysql:8
```

### 4. Copier le fichier SQL et l'exécuter dans le conteneur Docker MySQL

```bash
docker cp insert_data.sql hapi-mysql:/insert_data.sql
docker exec -it hapi-mysql mysql -uroot -phapi user < /insert_data.sql
```

### 5. Modifier le fichier .env avec vos données (exemple)

```env
MAIL_HOST='smtp.ethereal.email'
MAIL_PORT=587
MAIL_USER='benny.fadel@ethereal.email'
MAIL_PASS='bPC486MExyun8k26R4'
```

### 6. Démarrer le serveur

```bash
npm start
```

Le projet devrait maintenant être accessible via le navigateur ```http://localhost:3000/documentation```. Assurez-vous d'avoir respecté toutes les étapes pour éviter tout problème lors du lancement du projet.

Bonne utilisation !
