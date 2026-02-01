README – User Management Module (Intelligent Employee Recommendation System)
1. Description

Le module User Management permet de :

Créer, modifier et supprimer des comptes utilisateurs.

Gérer les rôles et permissions : HR, MANAGER, EMPLOYEE.

Assurer une authentification sécurisée avec JWT (JSON Web Token).

Toutes les routes sauf inscription et login nécessitent un token JWT dans le header Authorization.

2. Prérequis

Node.js v18+

NestJS installé

MongoDB en fonctionnement

Postman pour tester les routes

3. Installation et démarrage
# Installer les dépendances
npm install

# Démarrer le serveur NestJS
npm run start


Le serveur est accessible sur :

http://localhost:3000

4. Configuration du module JWT
   4.1 Installation
   npm install @nestjs/jwt passport-jwt

4.2 Configuration dans AuthModule,4.3 JWT Auth Guard,4.4 JwtStrateg






5. Routes API

| Méthode | Route             | Rôle requis | Body JSON (exemple)                                                                                                                           | Description                                         |
| ------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| POST    | `/users/register` | Aucun       | `json { "firstName": "Amin", "lastName": "Chniti", "email": "amin@example.com", "password": "123456", "role": "EMPLOYEE", "isActive": true }` | Crée un nouvel utilisateur                          |
| POST    | `/users/login`    | Aucun       | `json { "email": "amin@example.com", "password": "123456" }`                                                                                  | Authentifie un utilisateur et retourne un token JWT |
| GET     | `/users`          | HR          | -                                                                                                                                             | Récupère tous les utilisateurs                      |
| GET     | `/users/:id`      | HR, MANAGER | -                                                                                                                                             | Récupère un utilisateur par ID                      |
| PATCH   | `/users/edit/:id` | HR          | `json { "firstName": "Amin", "lastName": "Chniti", "role": "MANAGER", "isActive": true }`                                                     | Met à jour un utilisateur                           |
| DELETE  | `/users/:id`      | HR          | -                                                                                                                                             | Supprime un utilisateur                             |






6. Authentification JWT

Après login, tu obtiens une réponse avec le token :

{
"message": "Connexion réussie",
"user": {
"firstName": "Amin",
"lastName": "Chniti",
"role": "MANAGER",
"isActive": true,
"_id": "697fa48597e35aa79dda9129"
},
"token": {
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}


Pour utiliser ce token, ajoute un header dans Postman pour toutes les routes sécurisées :

Key	Value
Authorization	Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Remplace <token> par le token réel reçu lors du login.






7. Test complet avec Postman
   7.1 Inscription

URL : POST http://localhost:3000/users/register

Body : JSON

{
"firstName": "Amin",
"lastName": "Chniti",
"email": "amin@example.com",
"password": "123456",
"role": "EMPLOYEE",
"isActive": true
}





7.2 Login

URL : POST http://localhost:3000/users/login

Body : JSON

{
"email": "amin@example.com",
"password": "123456"
}


Résultat : access_token → à copier pour les routes suivantes





7.3 Récupérer tous les utilisateurs

URL : GET http://localhost:3000/users

Headers :

Authorization: Bearer <token>




7.4 Récupérer un utilisateur par ID

URL : GET http://localhost:3000/users/<userId>

Headers :

Authorization: Bearer <token>





7.5 Modifier un utilisateur


URL : PATCH http://localhost:3000/users/edit/<userId>

Headers :

Authorization: Bearer <token>
Content-Type: application/json


Body : JSON

{
"firstName": "Amin",
"lastName": "Chniti",
"role": "MANAGER",
"isActive": true
}

7.6 Supprimer un utilisateur

URL : DELETE http://localhost:3000/users/<userId>

Headers :

Authorization: Bearer <token>

8. Notes importantes






RolesGuard contrôle les accès selon le rôle utilisateur (HR, MANAGER, EMPLOYEE).

Routes register et login sont publiques, toutes les autres nécessitent JWT + rôle approprié.

Les erreurs courantes :

401 Unauthorized → token manquant ou invalide

403 Forbidden → rôle insuffisant

404 Not Found → utilisateur non trouvé








9. Redmine détaillé pour la partie User

Inscription (register) : crée un utilisateur, hash le mot de passe.

Login (login) : vérifie email + mot de passe, retourne JWT.

Get All (findAll) : accessible uniquement aux HR.

Get By ID (findOne) : accessible HR et MANAGER.

Update (updateById) : accessible HR uniquement, met à jour n’importe quel champ sauf _id.

Delete (deleteById) : accessible HR uniquement, supprime l’utilisateur de la DB.

JWT : utilisé pour sécuriser toutes les routes sauf register et login.

RolesGuard : contrôle l’accès basé sur le rôle de l’utilisateur dans le payload JWT.