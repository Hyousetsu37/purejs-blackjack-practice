(() => {
  "use strict";
  //Create the deck

  let deck = [];
  let types = ["C", "S", "D", "H"];
  let special = ["J", "A", "Q", "K"];
  let playerScore = { value: 0 };
  let computerScore = { value: 0 };

  const createDeck = () => {
    for (type of types) {
      for (let i = 2; i <= 10; i++) {
        deck.push(i + type);
      }
      for (spec of special) {
        {
          deck.push(spec + type);
        }
      }
    }
    deck.sort(() => Math.random() - 0.5);
    return deck;
  };

  createDeck();

  //Function to ask for a card
  const askCard = (deck) => {
    if (deck.lenght === 0) {
      throw "No more cards on deck";
    }
    return deck.pop();
  };

  //Function to give value to the card
  const cardValue = (card) => {
    let value = card.substring(0, card.length - 1);
    return !isNaN(value) ? Number(value) : value !== "A" ? 10 : 11;
  };

  //Manipulate the document

  const newGameButton = document.querySelector("#new-game");
  const askButton = document.querySelector("#ask-card");
  const stopButton = document.querySelector("#stop-game");
  const playerCardSide = document.querySelector(".player");
  const pcCardSide = document.querySelector(".computer");

  //Create the game flow function so it is not duplicated
  const gameFlow = (scoreHolder, player) => {
    //Ask for the card
    let askedCard = askCard(deck);
    //Update player score
    scoreHolder.value += cardValue(askedCard);
    console.log(scoreHolder);
    //Create Img element, add src and class for styling
    let cardImg = document.createElement("img");
    cardImg.src = `assets/cartas/${askedCard}.png`;
    cardImg.classList.add("card");
    //Append the new Img to the player card container
    player.querySelector(".cards").appendChild(cardImg);
    //Update player score in the document
    player.querySelector("small").innerText = scoreHolder.value;
  };

  //Function to define the rules of the computer
  const pcFlow = () => {
    do {
      if (
        (playerScore.value > 21 && computerScore.value <= 10) ||
        playerScore.value < 21
      ) {
        gameFlow(computerScore, pcCardSide);
      } else {
        break;
      }
    } while (computerScore.value <= playerScore.value);
    setTimeout(() => {
      if (playerScore.value > 21 && computerScore.value > 21) {
        alert("Both lost");
      } else if (
        (playerScore.value <= computerScore.value &&
          computerScore.value <= 21) ||
        playerScore.value > 21
      ) {
        alert("Computer wins");
      } else {
        alert("You win");
      }
    }, 300);
  };

  //Making the askButton  excecute the as
  askButton.addEventListener("click", () => {
    gameFlow(playerScore, playerCardSide);
    if (playerScore.value >= 21) {
      pcFlow();
    }
  });

  stopButton.addEventListener("click", () => {
    pcFlow();
  });

  newGameButton.addEventListener("click", () => {
    playerScore = { value: 0 };
    computerScore = { value: 0 };
    deck = [];
    createDeck();
    playerCardSide.querySelector("small").innerText = 0;
    pcCardSide.querySelector("small").innerText = 0;
    document
      .querySelectorAll(".cards")
      .forEach((element) => (element.innerHTML = ""));
  });
})();
