// Fight or skip choice function
var fightOrSkip = function() {
  // fight or skip?
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

  if (promptFight === "" || promptFight === null) {
    window.alert("Please enter a valid option!");
    fightOrSkip();
  }

  promptFight = promptFight.toLowerCase()

  if (promptFight === "skip") {
    // Confirm skip
    var confirmSkip = window.confirm("Are you sure you want to skip?");

    if (confirmSkip) {
      window.alert(playerInfo.name + " has chosen to skip the fight!");
      // Subtract money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      
      // return true if player wants to skip
      return true;
    }
  }

  return false;
};

// Fight function
var fight = function(enemy) {
  // Determine whose turn it is
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  // Repeat while enemy is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // Ask player to fight or skip
      if (fightOrSkip()) {
        // Break loop if true
        break;
      }

      // Generate player robot attack damage
      var damage = randomNumber(playerInfo.attack - 5, playerInfo.attack);

      // Subtract value of 'playerInfo.attack' from value of 'enemy.health' and update 'enemy.health' variable
      enemy.health = Math.max(0, enemy.health - damage);
    
      // Log results to console
      console.log(
        playerInfo.name + 
        " attacked " + 
        enemy.name + 
        " for " + 
        damage + 
        " damage."
      );
    
      // Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        playerInfo.money += randomNumber(2, playerInfo.money + 10);
        window.alert(playerInfo.name + " received money for winning!");
        window.alert(playerInfo.name + " now has " + playerInfo.money + " dollars!");
        break;
      } else {
        window.alert(
          enemy.name + 
          " still has " + 
          enemy.health + 
          " health left."
        );
      }

    
    } else { // Player gets attacked first

      // Generate enemy damage
      var damage = randomNumber(enemy.attack - 5, enemy.attack);

      // Subtract value of 'enemy.attack' from value of 'playerInfo.health' and update 'playerInfo.health' variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
    
      // Log results to console
      console.log(
        enemy.name + 
        " attacked " + 
        playerInfo.name + 
        " for " + 
        damage + 
        " damage."
      );

      // Check players's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(
          playerInfo.name + 
          " still has " + 
          playerInfo.health + 
          " health left."
        );
      }
    }
    // Switch turn order
    isPlayerTurn = !isPlayerTurn;
  }
};

// Start new game
function startGame() {
  // Reset player stats
  playerInfo.reset();

  // Start fight
  for (var i=0;i<enemyInfo.length;i++) {
    if (playerInfo.health > 0) {
      // Round alert
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
  
      // Pick an enemy based on array index
      var pickedEnemyObj = enemyInfo[i];
  
      // Reset enemy health
      pickedEnemyObj.health = randomNumber(20, 80);
  
      // Pass enemey combatant to fight function
      fight(pickedEnemyObj);

      // If not at last enemy
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // Enter shop?
        var storeConfirm = window.confirm(
          "The round is over. Visit the shop before next round?"
        );

        // shop confirmed
        if (storeConfirm) {
          shop()
        }
      }
    } else {
      // Game Over
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  endGame();
}

var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // Check localstorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highScore");
  if (highScore === null) {
    highScore = 0;
  }
  // If player has more money than high score, player set new high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highScore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " set the high score of " + playerInfo.money + "!");
  } else {
    alert(playerInfo.name + " did not beat the high score of " + playerInfo.money + ". Maybe next time!");
  }

  // Play again?
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // Restart game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // Shop options
  var shopOptionPrompt = window.prompt(
    "Would you like to REPAIR (+HP) your robot, UPGRADE (+ATK) your robot, or LEAVE the store? Please enter 1 for REPAIR, 2 for UPGRADE, or 3 to LEAVE."
    );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  
  // Option switch
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.repairRobot();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the shop");

      // Do nothing and exit
      break;
    default:
      window.alert("You didn't pick a valid option. Try again.");

      // Call shop() to force valid option
      shop()
      break;
  }
};

// Function to generate random number up to 80
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * + (max - min) + min);

  return value;
};

// Get player name function
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

// Player info
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  repairRobot: function() {
    if (playerInfo.money >= 7) {
      window.alert("Refilling player robot's health by 20 for 7 dollars.");

      // Increase health and decrease money
      playerInfo.health += 20;
      playerInfo.money -= 7;

    } else {
      window.alert("You don't have enough money.");
    }
  },
  upgradeAttack: function() {
    if (playerInfo.money >= 7) {
      window.alert("Upgrading player robot's attack by 6 for 7 dollars.");

      // Increase attack and decrease money
      playerInfo.attack += 6;
      playerInfo.money -= 7;

    } else {
      window.alert("You don't have enough money.");
    }
  }
};

// Enemy info
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
  
];

startGame();