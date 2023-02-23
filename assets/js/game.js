var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
//to retrieve the 1st element: console.log(enemyNames[0]);
// to find the length of the array: console.log(enemyNames.length);
var enemyHealth = 50;
var enemyAttack = 12;

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

// this creates a function named "fight". The function's parameter is enemyName. It is defined by the code block inside {}
var fight = function(enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0){
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to skip
        if ( promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;  
            }
        }
        //remove enemy's health by subtracting the amount set in the playerAttack variable
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        
        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            // reward player money for winning
            playerMoney = playerMoney + 20;
            //leave while() since enemy is dead
            break;    
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //remove player's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            //leave the while loop if player is dead
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } //end of while lopp   
}; // end of fight function

//function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    //fight each enemy-robot by looping over them and fight them one at a time
    for(var i = 0; i < enemyNames.length; i++) {
        // if playerHealth > 0, keep fighting
        if (playerHealth > 0) {
            //let player know what round they are in, remember that arrays start at 0, so it needs to be added 1
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before starting new fight
            // because randomNumber() returns a value, that returned value can be stored in the enemyHealth variable
            enemyHealth = randomNumber(40, 60);

            //use debugger to pause script and check what's going on at that moment in the code
            //debugger;

            fight(pickedEnemyName);

            //if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length -1){
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next rounsd?");
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
    //after lopp ends, we are either out of playerHealth or enemies to fight, so run the endGame
    endGame();
};

//function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did !");
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
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
startGame();