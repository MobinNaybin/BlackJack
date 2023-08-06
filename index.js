let player = {
  name: prompt("What is your name?"),
  chips: 200,
};

let cards = [];
let dealerCards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;
let dealerEl = document.getElementById("dealer-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
let dealerCard1 = getRandomCard();
let dealerCard2 = getRandomCard();
let dealerSum = dealerCard1 + dealerCard2;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  hasBlackJack = false;
  isAlive = true;
  dealerCard1 = getRandomCard();
  dealerCard2 = getRandomCard();
  dealerCards = [dealerCard1, dealerCard2];
  dealerSum = dealerCard1 + dealerCard2;
  // player.bet =
  //   Number(prompt("How much do you bet this round?")) ||
  //   prompt("Enter a number!!!");
  bet();
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  dealerEl.textContent = "Dealer's Cards: " + dealerCard1 + "  *";
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  dealerSumEl.textContent = "Sum: " + dealerCard1;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " - ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    dealerEl.textContent =
      "Dealer's Card: " + dealerCard1 + " - " + dealerCard2;
    dealerSumEl.textContent = "Sum: " + dealerSum;
    winner();
  } else {
    message = "You're out of the game!";
    dealerEl.textContent =
      " Dealer's Card: " + dealerCard1 + " - " + dealerCard2;
    dealerSumEl.textContent = "Sum: " + dealerSum;
    winner();
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function stand() {
  dealerEl.textContent = " Dealer's Card: " + dealerCard1 + " - " + dealerCard2;
  dealerSumEl.textContent = "Sum: " + dealerSum;

  while (sum > dealerSum && sum <= 21 && isAlive === true) {
    let randomCard = getRandomCard();
    dealerCards.push(randomCard);
    dealerSum += randomCard;
    dealerEl.textContent += " - " + randomCard;
    dealerSumEl.textContent = "Sum: " + dealerSum;
  }
  if (isAlive === true) winner();
}

function winner() {
  if ((sum > dealerSum && sum <= 21 && isAlive === true) || dealerSum > 21) {
    player.chips += 2 * player.bet;
    alert("You Won!");
  } else if (sum === dealerSum && isAlive === true) {
    player.chips += player.bet;
    alert("Draw!");
  } else {
    // player.chips -= player.bet;
    alert("You Loose!");
  }
  playerEl.textContent = player.name + ": $" + player.chips;
  isAlive = false;
}
function bet() {
  player.bet = Number(prompt("How much do you bet this round?"));

  while (!player.bet && player.bet != 0) {
    player.bet = Number(prompt("Enter a number as your bet!"));
  }
  while (player.bet > player.chips || player.bet == 0) {
    player.bet = Number(prompt("You don't have enough chips to bet!"));
    while (!player.bet && player.bet != 0) {
      player.bet = Number(prompt("Enter a number as your bet!"));
    }
  }
  player.chips -= player.bet;
  playerEl.textContent = player.name + ": $" + player.chips;
}
