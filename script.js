document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("message-box");
    const playerInput = document.getElementById("player-input");
    const submitButton = document.getElementById("submit-button");

    let choice;
    let damageDealt;
    let damageTaken;
    let enemiesDefeated = 0;
    const winCondition = 5;

    const enemies = ["Skeleton", "Warlock", "Zombie", "Barbarian", "Goblin"];
    const maxEnemyHealth = 115;
    const enemyAttackDamage = 25;
    let enemyHealth;
    let enemy;

    let health = 0;
    let playerAttackDamage = 0;
    let numHealthPots = 3;
    const healAmount = 25;
    const potionDropChance = 35; // percentage

    let playerWeapon;
    let attackType = "";

    function displayMessage(text) {
        messageBox.innerHTML += `<p>${text}</p>`;
        messageBox.scrollTop = messageBox.scrollHeight;
    }

    // Function to process weapon choice
    function handleWeaponChoiceInput() {
        choice = playerInput.value.trim();
        playerInput.value = "";
        console.log("Input:", choice);
        processWeaponChoice(choice);
    }

    // Function to handle user actions during the game
    function handleGameInput() {
        choice = playerInput.value.trim();
        playerInput.value = "";
        console.log("Input:", choice);
        handleUserInput(choice);
    }

    function processWeaponChoice(chosenWeapon) {
        switch (chosenWeapon) {
            case "1":
                displayMessage("You have chosen the sword, good luck mighty warrior!");
                playerWeapon = "sword";
                attackType = "slash";
                health = 100;
                playerAttackDamage = 40;
                displayMessage("You embark on your journey with your " + playerWeapon + ".");
                startGame();
                break;
            case "2":
                displayMessage("You have chosen the wand, good luck powerful mage!");
                playerWeapon = "wand";
                attackType = "blast";
                health = 55;
                playerAttackDamage = 85;
                displayMessage("You embark on your journey with your " + playerWeapon + ".");
                startGame();
                break;
            case "3":
                displayMessage("You have chosen the bow, good luck skilled archer!");
                playerWeapon = "bow";
                attackType = "shoot";
                health = 85;
                playerAttackDamage = 55;
                displayMessage("You embark on your journey with your " + playerWeapon + ".");
                startGame();
                break;
            case "4":
                displayMessage("You have chosen the daggers, good luck cunning rogue!");
                playerWeapon = "daggers";
                attackType = "stab";
                health = 65;
                playerAttackDamage = 75;
                displayMessage("You embark on your journey with your " + playerWeapon + ".");
                startGame();
                break;
            default:
                displayMessage("That is not a correct option, please enter a number for which weapon you want!");
        }
    }

    function handleUserInput(choice) {
        switch (choice) {
            case "1":
                damageDealt = Math.floor(Math.random() * (playerAttackDamage - (playerAttackDamage / 3)) + playerAttackDamage / 3);
                damageTaken = Math.floor(Math.random() * (enemyAttackDamage - 5)) + 5;
                enemyHealth -= damageDealt;
                health -= damageTaken;

                displayMessage(`> You ${attackType} the ${enemy} with your ${playerWeapon} for ${damageDealt} damage!`);
                displayMessage(`> The ${enemy} hits you back for ${damageTaken} damage!`);

                if (health < 1) {
                    displayMessage("> You have taken too much damage, your vision goes black and your body hits the floor. You are dead.");
                    endGame();
                } else if (enemyHealth < 1) {
                    displayMessage(`> You defeated the ${enemy}!`);
                    enemiesDefeated++;

                    if (enemiesDefeated >= winCondition) {
                        displayMessage("> You have reached the end of the dungeon! Congratulations skilled hero!");
                        displayMessage("> You claim your prize, a large treasure chest full to the brim with gold!");
                        endGame();
                        return;
                    }

                    if (Math.random() * 100 < potionDropChance) {
                        numHealthPots++;
                        displayMessage(`> You find a health potion on the ${enemy}'s corpse!`);
                        displayMessage(`> You now have ${numHealthPots} health potion(s)!`);
                    }

                    displayMessage(`Your HP: ${health}`);
                    displayMessage("> You continue through the dungeon.");
                    startGame();
                } else {
                    displayMessage(`Your HP: ${health}`);
                    displayMessage(`${enemy}'s HP: ${enemyHealth}`);
                    displayMessage("What would you like to do?<br>1. attack<br>2. drink health potion<br>3. run away and cry");
                }
                break;
            case "2":
                if (numHealthPots > 0) {
                    const oldHealth = health;
                    health += healAmount;
                    numHealthPots--;

                    if (health > 125) {
                        health = 125;
                        displayMessage(`> You guzzle down the red liquid and heal for ${health - oldHealth} HP.<br> > Your HP is now: ${health}!<br> > You now have ${numHealthPots} health potion(s) remaining.`);
                    } else {
                        displayMessage(`> You guzzle down the red liquid and heal for ${healAmount} HP.<br> > Your HP is now: ${health}!<br> > You now have ${numHealthPots} health potion(s) remaining.`);
                    }
                } else {
                    displayMessage("You have no remaining health potions!");
                }
                displayMessage(`Your HP: ${health}`);
                displayMessage(`${enemy}'s HP: ${enemyHealth}`);
                displayMessage("What would you like to do?<br>1. attack<br>2. drink health potion<br>3. run away and cry");
                break;
            case "3":
                displayMessage(`> You run away from the ${enemy}! Your journey is over and you flee the dungeon in shame.`);
                endGame();
                break;
            default:
                displayMessage("That is not a correct option, please enter a number for which action you would like to do!");
        }
    }

    function handleWeaponChoice() {
        displayMessage("Welcome to the Text Krusade!");
        displayMessage("You enter the dungeon, a willing and able adventurer!");
        displayMessage("Choose your weapon!<br>1. Sword<br>2. Wand<br>3. Bow<br>4. Daggers");
        submitButton.addEventListener("click", handleWeaponChoiceInput);
    }

    function startGame() {
        displayMessage("-------------------------------");

        enemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 15)) + 15;
        enemy = enemies[Math.floor(Math.random() * enemies.length)];

        displayMessage(`You encounter a ${enemy}`);

        displayMessage(`Your HP: ${health}`);
        displayMessage(`${enemy}'s HP: ${enemyHealth}`);
        displayMessage("What would you like to do?<br>1. attack<br>2. drink health potion<br>3. run away and cry");
        submitButton.removeEventListener("click", handleWeaponChoiceInput);
        submitButton.addEventListener("click", handleGameInput);
    }

    function endGame() {
        displayMessage("------------------------------------------------------------");
        displayMessage("| Your journey has now come to an end. Thanks for playing! |");
        displayMessage("------------------------------------------------------------");
    }


    handleWeaponChoice();
});
