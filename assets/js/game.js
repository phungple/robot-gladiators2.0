// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};
var fightOrSkip = function(){
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    // Conditional recursive function call to validate prompt answer
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    // Convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();
    //if player picks "skip" confirm and then stop the loop
    if ( promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money -10);
            
            //return true if player wants to leave
            return true;
        }
    }
    return false;

};

// this creates a function named "fight". The function's parameter is enemy. It is defined by the code block inside {}
var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
 
    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0){
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if(fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
        
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name+ " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // reward player money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave while() since enemy is dead
                break;    
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            
        }
        //player gets attacked firt
        else {

            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            //remove player's health by subtracting the amount set in the enemy.attack variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave the while loop if player is dead
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } 
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }    
}; // end of fight function

//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    //fight each enemy-robot by looping over them and fight them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        // if playerInfo.health > 0, keep fighting
        if (playerInfo.health > 0) {

            //let player know what round they are in, remember that arrays start at 0, so it needs to be added 1
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            
            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            // because randomNumber() returns a value, that returned value can be stored in the enemy.health variable
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1){
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                shop();
                }
            }
        }
        // if player isn't alive, stop the game
        else{
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after lopp ends, we are either out of playerInfo.health or enemies to fight, so run the endGame
    endGame();
};

//function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did !");

    //check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if the player has more money than the high score, player sets new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function(){
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your Health, UPGRADE your Attack, or LEAVE the store? Please enter: 1 for 'REFILL', 2 for'UPGRADE', or 3 for 'LEAVE' to make a choice."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            
            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};
// function to set name
var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot'name is " + name);
    return name;
};
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma !
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, //comma !
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attach by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

//var enemy.names = ["Roborto", "Amy Android", "Robo Trumble"];
//to retrieve the 1st element: console.log(enemy.names[0]);
// to find the length of the array: console.log(enemyInfo.length);
//var enemy.health = 50;
//var enemy.attack = 12;
var enemyInfo = [
    {
        name:"Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name:"Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
startGame();