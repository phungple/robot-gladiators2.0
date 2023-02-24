// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

// this creates a function named "fight". The function's parameter is enemy. It is defined by the code block inside {}
var fight = function(enemy) {
    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0){
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to skip
        if ( promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;  
            }
        }
        //remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
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

        //remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
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
    } //end of while lopp   
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

            //use debugger to pause script and check what's going on at that moment in the code
            //debugger;

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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
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
        "Would you like to REFILL your Health, UPGRADE your Attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
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

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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