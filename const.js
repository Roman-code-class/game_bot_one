const commands = `
/start - Перезапуск
/help - Помощь
/round - Начать игру
/info
`;

const compChoice = choiceComp();
const choiceUser = userChoice();

function userChoice() {
  // winner();
}

function choiceComp() {
  const random = ["Камень", "Ножницы", "Бумага"];
  const rands = Math.floor(Math.random() * random.length);
  compStep = random[rands];
  return compStep;
  // winner();
}

// const winner = winner();

function winner() {
  // blocked = false;
  const comb = userStep + compStep;
  console.log(comb);

  switch (comb) {
    case "rr":
    case "ss":
    case "pp":
      res.innerText = "Ничья";
      break;

    case "rs":
    case "sp":
    case "pr":
      res.innerText = "Победа";
      countU++;
      countUser.innerText = countU;
      compField
        .querySelector("[data-field=" + compStep + "]")
        .classList.add("error");
      break;

    case "sr":
    case "ps":
    case "rp":
      res.innerText = "Проигрыш";
      countC++;
      countComp.innerText = countC;
      userField
        .querySelector("[data-field=" + userStep + "]")
        .classList.add("error");
      break;

    default:
      break;
  }
}

module.exports.commands = commands;
module.exports.compChoice = compChoice;
module.exports.choiceUser = choiceUser;
// module.exports.winner = winner;
