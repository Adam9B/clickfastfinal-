# ClickFast ⏩

Sois le plus rapide des clickers du game ⚡

## Sommaire

- [Comment utiliser le projet ?](#comment-utiliser-le-projet-)
- [Exercices](#exercices)
  - [Exercice I - Faire fonctionner ClickFast (HTML CSS JS)](#exercice-i---faire-fonctionner-clickfast-html-css-js)
    - [1. Initialisation du projet](#1-initialisation-du-projet)
    - [2. Création des fichiers](#2-création-des-fichiers)
    - [3. Fonctionnalités de base](#3-fonctionnalités-de-base)
  - [Exercice II - Docker](#exercice-ii---docker)
  - [Exercice III - CI/CD](#exercice-iii---cicd)
  - [Exercice IV - Tests automatisés](#exercice-iv---tests-automatisés)
  - [Exercice V - Connecter notre projet à une API](#exercice-v---connecter-notre-projet-à-une-api)
- [Tips du Terminal](#tips-du-terminal)
  - [1. Raccourcis](#1-raccourcis)
  - [2. Commandes](#2-commandes)
  - [3. Commandes Git](#3-commandes-git)

---

## Comment utiliser le projet ?

Lancez `index.html` et voilà !

## Exercices

### Exercice I - Faire fonctionner ClickFast (HTML CSS JS)

#### 1. Initialisation du projet

> Comment le projet a été créé ?

1. Aller où on veut pour créer un projet dans un endroit rangé.  
   Ex:

```bash
  cd Desktop

  mkdir ClickFast

  ls # on voit qu'on a un dossier ClickFast qui a été créé
```

2. Aller dans le dossier qui vient d'être créé, pour faire un `git init`.

3. Créer un repository en ligne pour stocker le projet.  
   Lier le repository créé en ligne à ce projet local.

#### 2. Création des fichiers

Créer un fichier `index.html`, `style.css`, `script.js`. Ils vont chacun avoir leur propre rôle :

- `index.html` : le contenu du site : titre, bouton, score
- `style.css` : le styling
- `script.js` : la détection de clic sur un bouton, et l'affichage du nombre de clics dans l'élément de score

Recopiez le contenu de mes fichiers dans vos fichiers, pour avoir une base.

#### 3. Fonctionnalités de base

- Faire que qu'à chaque clic sur le bouton, le nombre affiché dans le site augmente.
- Bonus : ajouter un petit chrono, qui permet de ne modifier le compteur que pendant le temps imparti (5 secondes).

### Exercice II - Docker

Conteneuriser le projet dans un Docker :

1. Créer un Dockerfile
2. Trouver comment faire pour envelopper le projet dans un Dockerfile, et le lancer depuis docker.

   - Faire une simple recherche internet, ex: `html css docker`.  
     On se rend compte que la plupart des personnes recommandent nginx qui est super simple et adapté au lancement de sites statiques.
   - Solution : il y a toujours plein de solutions possibles.
     Moi j'ai appliqué [cette réponse](https://thriveread.com/run-html-with-docker-and-nginx/).
     D'autres ressources d'internet sur comment faire ça facilement disent à peu près la même chose : [omkara18 de dev.to](https://dev.to/omkara18/deploying-a-static-website-with-docker-a-comprehensive-guide-3gk), [Zulfikar sur medium](https://medium.com/@zul.m/deploying-a-static-html-site-with-docker-and-nginx-6f5bcdcbc650)

3. Maintenant, faire une commande comme `docker run -d -p 8080:80 clickfast` devrait lancer le projet conteneurisé !

### Exercice III - CI/CD

Implémentons le CI/CD !

1. Mettre le projet en ligne (gratuitement grâce à github.io)

   > Comment mettre son site en ligne ?

   L'outil [Github Pages](https://pages.github.com/) permet de le faire gratuitement !  
   Voilà comment [avoir plusieurs repo de rendus dans notre page](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

2. Configurer les Workflows
   1. Voilà un tuto https://medium.com/@pathirage/step-in-to-ci-cd-a-hands-on-guide-to-building-ci-cd-pipeline-with-github-actions-7490d6f7d8ff  
      Je vous invite à le survoler, mais on ne va pas le suivre.
   2. On va simplement aller dans l'onglet Actions de notre projet (dans notre repo en ligne, directement sur github.com), cliquer sur New Workflow.
   3. Là on voit plein de propositions de la part de github. On choisit Docker Image, pour qu'il nous édite un fichier `docker-image.yml`. Cela permettra aux Github Actions d'exécuter un Job concernant docker.
   4. Ne pas oublier de cliquer sur "Commit Changes" pour sauvegarder.

### Exercice IV - Tests automatisés

C'est bien beau notre CI/CD, mais c'est encore mieux lorsqu'il se charge tout seul de lancer nos tests 😎

> On veut tester notre JS automatiquement, pour ne pas avoir à vérifier sans arrêt s'il se comporte comme on le souhaite.

#### 1. Écrire nos Tests Unitaires

1. Pour exécuter des tests, nous aurons d'abord besoin d'installer les outils nécessaires.  
   Créer un environnement node / npm :

   ```bash
   npm init
   ```

   Installer jest et jsdom pour nos tests :

   ```bash
   npm install jsdom
   npm install --save-dev jest
   ```

   Vous aussi vous avez ça ?
   ![image](https://github.com/user-attachments/assets/453bb6e2-cf6e-423a-aba8-68699b40a64a)
   Pas de panique ! Ceci est un warning et non une erreur, donc rien de bloquant.  
   Une petite astuce pour régler le problème est de lancer la commande `npm audit fix` et hop, on nous dit que tout est propre !

3. Tout est installé, mais il faut modifier le script de test du `package.json` (car il est erronné).

   ```json
   "scripts": {
     "test": "npx jest"
   },
   ```

4. Écrivons des Tests unitaires, pour vérifier que quand X se passe, Y résultat se produit

5. Désormais nous pouvons tester nos tests en local !  
   Lancer les tests

   ```bash
   npx jest
   # ou pour exécuter les tests de la section script, dans package.json :
   npm run test
   ```

6. Les tests avec l'exemple `sum` du getting started ont marché ? Parfait ! Maintenant, à vous de jouer : réalisez les tests suivants pour faire en sorte que les tests passent
   ```javascript
   describe("(nommez ce groupe de test)", () => {
    // Avant chaque test, configurer l'environnement de test
    beforeEach(() => {
      // Réinitialiser le DOM ou créer des éléments nécessaires pour les tests
      document.body.innerHTML = `
        <div id="score">0</div>
        <div id="timer">5</div>
        <button id="button-clicker">Click me!</button>
        <button id="button-reset">Reset</button>
      `;
  
      // Appeler les fonctions pour attacher les événements
      handleGameButton();
      handleResetButton();
    });
  
    // Test pour vérifier que le score s'incrémente lorsque le bouton est cliqué
    test("Vérifiez que le score s'incrémente correctement", () => {
      // Simuler un clic sur le bouton
      // Utilisez une méthode pour cliquer sur le bouton et vérifiez le score
    });
  
    // Test pour vérifier que le timer fonctionne correctement
    test("Vérifiez que le timer décompte correctement", (done) => {
      // Simuler un clic pour démarrer le jeu
      // Attendez un certain temps et vérifiez que le timer affiche 0
    });
  
    // Test pour vérifier que le jeu ne permet pas de cliquer après la fin du timer
    test("Vérifiez que le score ne s'incrémente pas après la fin du timer", (done) => {
      // Simuler un clic pour démarrer le jeu
      // Attendez que le timer expire, puis essayez de cliquer à nouveau
      // Vérifiez que le score n'a pas changé
    });
  
    // Test pour vérifier que le bouton de réinitialisation fonctionne correctement
    test("Vérifiez que le bouton de réinitialisation remet le score à zéro", () => {
      // Simuler quelques clics pour augmenter le score
      // Vérifiez que le score est supérieur à zéro
      // Simuler un clic sur le bouton de réinitialisation
      // Vérifiez que le score a été remis à zéro
    });
   });
   ```



#### 2. Déclencher les tests en ligne

Ça marche sur notre ordi, ça doit maintenant marcher en ligne !

Inscrivons une règle pour que notre test soit bien lancé quand on veut push notre modification

#### 3. Bonus : Tests d'intégration

Alors là on est des boss, on va faire du code qui vérifie que notre front fonctionne bien.

1. En utilisant [Playwright ?], on va vérifier que quand on clique sur [...], on a bien [... qui réagit].
2. Maintenant, faire que notre CI CD lance bien ces tests également

### Exercice V - Connecter notre projet à une API

Désormais, on a une bonne grosse base et qu'on a vu tous les concepts qu'on souhaitait voir, on va pouvoir s'amuser un peu plus : on va créer un système de scoreboard, permettant à tout le monde de soumettre son score et voir celui des autres.

#### Comment manipuler l'API ?

Comment envoyer mon score :

```javascript
const postData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username: "JohnDoe",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: 100,
    website_url: "onyj.github.io/ClickFast",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data posted successfully:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

postData();
```

Comment lire les scores :

```javascript
const getData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data retrieved successfully:", data);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

getData();
```

Comment remplacer mon ancien score avec le nouveau :

```javascript
const usernameToDelete = "JohnDoe";

const deleteUserByUsername = async (username) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter(
      (user) => user.username === username
    );

    // Étape 2 : Supprimer chaque utilisateur trouvé
    for (const user of usersToDelete) {
      const deleteResponse = await fetch(`${url}/${user.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        console.error(
          `Error deleting user with ID ${user.id}:`,
          deleteResponse.statusText
        );
      } else {
        console.log(`User with ID ${user.id} deleted successfully.`);
      }
    }

    // Étape 3 : Ajouter un nouvel utilisateur
    const newUserData = {
      createdAt: new Date().toISOString(),
      username: "JohnDoe", // Vous pouvez changer le nom d'utilisateur si nécessaire
      avatar:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
      score: 100,
      website_url: "onyj.github.io/ClickFast",
    };

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!postResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserResult = await postResponse.json();
    console.log("New user posted successfully:", newUserResult);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Appel de la fonction pour supprimer et ajouter un utilisateur
deleteUserByUsername(usernameToDelete);
```

## Tips du Terminal

> Voilà une anti-sèche pour mieux maîtriser le terminal

### 1. Raccourcis

- `tab` : appuyer sur tab pour compléter le mot qu'on est en train d'écrire

### 2. Commandes

- `cd` : se déplacer vers un dossier : `cd MonDossier` ou `cd Mondossier/sous-dossier/sous-sous-dossier`
  `cd .. = remonter dans dossier parent`
- `ls` : lister les éléments dans le dossier où on se trouve
- `git init` : créer un repository (ou dépot) git dans le dossier où on se trouve

### 3. Commandes Git

- `git status` : Montre les fichiers qui ont été modifiés mais pas encore sauvegardés.
- `git diff` ou `git diff mon_fichier` : Affiche les changements faits par rapport à la dernière sauvegarde, pour tous les fichiers ou un fichier spécifique.
- `git log` : voir les commits réalisés
- `git add mon_fichier` : ajouter des fichiers à sauvegarder
- `git commit -m "J'ai fait telle chose` : nommer une nouvelle sauvegarde
- `git push` : envoyer les sauvegardes vers GitHub
- `git remote -v` : voir les connexions entre notre dossier local (dans l'ordi) et les éléments en ligne (connexion au repository GitHub, ou autres)
