
let BestScore = 0;

function jeu() {
const scoreDisplay = document.getElementById("score");
let canPlay = true;
let gameStarted = false;
let scoreCount = 0;
let timeLeft = 5;
const resetButton = document.getElementById("buttonreset");
const button = document.getElementById("button-clicker");

let bestSCO = document.getElementById("bestscore");


  function handleGameButton() {
    button.addEventListener("click", () => {
      if (!gameStarted) {
        gameStarted = true;

        startTimer();
      }

      if (canPlay) {
        scoreCount++;
      }
      scoreDisplay.innerHTML = scoreCount;
    });
  }

  function startTimer() {
    const htmlTimer = document.getElementById("timer");
    for (let i = timeLeft; i >= 0; i--) {
      setTimeout(() => {
        htmlTimer.innerHTML = `temps restant : ${i}`;

        if (i == 0) {
          canPlay = false;
          postData();
        }

        if (i <= 0) {
          resetButton.disabled = false;
          console.log("ca passe plus");
        } else {
          resetButton.disabled = true;
          console.log("ca passe");
        }
        if (i >= 0) {
          console.log("score de la partie");

          console.log(scoreCount);
          if (scoreCount > BestScore) {
            console.log("record battu");

            BestScore = scoreCount;
            console.log(BestScore);
            bestSCO.innerHTML = BestScore;
          }
        }
      }, (timeLeft - i) * 1000);

      
    }
  }

  function handleResetButton() {
    resetButton.addEventListener("click", () => {
      canPlay = true;
      gameStarted = false;
      scoreCount = 0;
      scoreDisplay.innerHTML = scoreCount;
    });
  }

  handleGameButton();
  handleResetButton();
}

jeu();

const postData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username: "Adam Le Boss du click" ,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNkONILskrl41lDu6PV0TGE17U6CpzacEEDASmxOd_ogL5sjfzh5O-vuno0nawrxYO2M&usqp=CAU",
    score: BestScore,
    website_url: "https://adam9b.github.io/clickfastfinal-/",
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

// const usernameToDelete = "David Pro+ Ultra 512go";

// const deleteUserByUsername = async (username) => {
//   const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

//   try {
//     // Étape 1 : Récupérer les utilisateurs avec le même username
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const users = await response.json();
//     const usersToDelete = users.filter((user) => user.username === username);

//     // Étape 2 : Supprimer chaque utilisateur trouvé
//     for (const user of usersToDelete) {
//       const deleteResponse = await fetch(`${url}/${user.id}`, {
//         method: "DELETE",
//       });

//       if (!deleteResponse.ok) {
//         console.error(
//           `Error deleting user with ID ${user.id}:`,
//           deleteResponse.statusText
//         );
//       } else {
//         console.log(`User with ID ${user.id} deleted successfully.`);
//       }
//     }

//     // Étape 3 : Ajouter un nouvel utilisateur
//     const newUserData = {
//       createdAt: new Date().toISOString(),
//       username: "2", // Vous pouvez changer le nom d'utilisateur si nécessaire
//       avatar:
//         "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
//       score: BestScore,
//       website_url: "onyj.github.io/ClickFast",
//     };

//     const postResponse = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newUserData),
//     });

//     if (!postResponse.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const newUserResult = await postResponse.json();
//     console.log("New user posted successfully:", newUserResult);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// // Appel de la fonction pour supprimer et ajouter un utilisateur
// deleteUserByUsername(usernameToDelete);
const displayScores = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const scoresList = document.getElementById("scores-list");

    // Vider la liste des scores avant d'ajouter les nouveaux scores
    scoresList.innerHTML = "";

    data.forEach((score) => {
      const listItem = document.createElement("li");

      // Créer une balise img pour l'avatar
      const avatarImg = document.createElement("img");
      avatarImg.src = score.avatar;
      avatarImg.alt = `${score.username}'s avatar;`

      // Ajouter l'avatar et le score à l'élément de liste
      listItem.appendChild(avatarImg);
      listItem.appendChild(
        document.createTextNode( `${score.username}: ${score.score}`)
      );
      scoresList.appendChild(listItem);
    });

    console.log("Scores displayed successfully:", data);
  } catch (error) {
    console.error("Error displaying scores:", error);
  }
};

// Appel de la fonction pour afficher les scores
displayScores();