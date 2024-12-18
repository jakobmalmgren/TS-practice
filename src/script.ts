//first//
// en tärning
// Skapa ett objekt med egenskapen sides metoden throw() som slumpar ett tal mellan 1 och sides. Din tärning kan innehålla allt ifrån 6 till 24 sidor.

// Visa dem i browsern
// Slå 10st tärningar och visa dem grafiskt i webbläsaren med HTML och CSS, inga bilder!

// Slumpen-testet
// Slå tärningen 10 000 ggr. Hur ser slagfördelningen ut 1 - 6? Visas i bodyn. Alt. med diagram från charts.js el. dyl.

const container: Element | null = document.querySelector(".dice-container");
const containerRest: Element | null = document.querySelector(
  ".dice-container-rest"
);
const containerInfo: Element | null = document.querySelector(
  ".info-first-container"
);
const containerRestInfo: Element | null = document.querySelector(
  ".info-second-container"
);
let value: number;

interface Dice {
  sides: number;
  throwDice: () => number;
}
const dizeObj: Dice = {
  sides: 6,
  throwDice,
};

function throwDice(): number {
  value = Math.floor(Math.random() * dizeObj.sides + 1);
  return value;
}
for (let i = 0; i < 10; i++) {
  if (container !== null && containerRest !== null) {
    value = dizeObj.throwDice();
    if (value === 1 && containerInfo !== null) {
      container.innerHTML += `<div class ="wrapper" ><div class="dice-p">${value}</div></div>`;
      containerInfo.innerHTML = `Number 1 items : <div>${container.children.length}</div>`;
    } else {
      containerRest.innerHTML += `<div class ="wrapper" ><div class="dice-p">${value}</div></div>`;
      if (containerRestInfo !== null) {
        containerRestInfo.innerHTML = `The rest : <div>${containerRest.children.length}</div>`;
      }
    }
  }
}

//second//
// Stegen
// Gör ett tärningspel där användaren ska kasta 1st tärning. Vid första kastet ska målet vara 1.
//  Om 1 ej fås, ska man försöka igen. Hur många kast tar det för att komma upp i
// en stege, 1,2,3,4,5,6? Kast räknas och den med lägst antal kast vinner.
// Visa med snyggt gränssnitt.
const tryEl = document.querySelector(".try-el");
const btn = document.querySelector(".btn");
btn?.addEventListener("click", () => calculateRolls());
let numberOfRoll: number = 0;
let numberArray: any = [1, 2, 3, 4, 5, 6];

function throwNumber(): number {
  value = Math.floor(Math.random() * dizeObj.sides + 1);
  return value;
}

function calculateRolls() {
  value = throwNumber();
  console.log(value);

  if (value !== numberArray[0]) {
    numberOfRoll++;
  } else if (value === numberArray[0]) {
    numberArray.shift();
  }
  if (numberArray.length === 0 && tryEl !== null) {
    tryEl.innerHTML += `<div>${numberOfRoll}</div>`;
    numberOfRoll = 0;
    numberArray = [1, 2, 3, 4, 5, 6];
    console.log("slut");
  }
  console.log(`nummerofrolls = ${numberOfRoll}`);
  console.log(`nummearray = ${numberArray}`);
}

//third//
// Knock out
// Spelet har 2st tärningar.
// Du som spelare väljer ett “knock out number” – antingen 6, 7, 8, eller 9.
// Spelaren kastar båda tärningarna. Anteckna varje kasts resultat.
// Om spelaren kastar något utav "knock out numbers" ges minuspoäng
// Vinner gör man antingen på högst poäng på 30 s, alt. högst poäng efter N knock outs.

const throwbtn = document.querySelector(".throwTwoDices");
throwbtn?.addEventListener("click", () => {
  throwTwoDices();
});
let totalScore: number = 0;
const knockOutNumber: number = 3;
console.log(`knockoutnumber : ${knockOutNumber}`);

function throwDices(): number {
  value = Math.floor(Math.random() * dizeObj.sides + 1);

  return value;
}

function throwTwoDices(): void {
  const valueOne: number = throwDices();
  const valuetwo: number = throwDices();
  console.log(valueOne);
  console.log(valuetwo);

  if (valueOne !== knockOutNumber && valuetwo !== knockOutNumber) {
    totalScore += valueOne + valuetwo;
  } else if (valueOne !== knockOutNumber && valuetwo === knockOutNumber) {
    totalScore = totalScore + valueOne - knockOutNumber;
  } else if (valuetwo !== knockOutNumber && valueOne === knockOutNumber) {
    totalScore = totalScore + valuetwo - knockOutNumber;
  } else if (valueOne === knockOutNumber && valuetwo === knockOutNumber) {
    totalScore -= knockOutNumber + knockOutNumber;
  }
  console.log(`totalscore : ${totalScore}`);

  setTimeout(() => {
    if (throwbtn) {
      console.log("10s har gått");
      console.log(` SLUTGILTLIGA totalscore : ${totalScore}`);
      throwbtn.setAttribute("disabled", "");
    }
  }, 10000);
}
