
let user_score = 0;
let comp_score = 0;
document.getElementById('shot').disabled = true;

function playGame(){
    
    const choices = document.querySelectorAll('.choice button');
    const user_choice = document.querySelector('.userChoice');
    const computer_choice = document.querySelector('.computerChoice');
    const infoText = document.querySelector('.choice h3');
    const reset = document.getElementById('reset');

    
    
    choices.forEach(choice => {
        choice.addEventListener('click', function(){                
            const computerChoice = getOption(); 
            compare(this.id, computerChoice);

            disableButtonShot(); 
            
            user_choice.src = `./image/${this.id}.png`;
            computer_choice.src = `image/${computerChoice}.png`;
        });
    });

    reset.addEventListener('click', resetScore);

    function getOption()
    {
        let compOptions;
        if(comp_score <= 0){
            compOptions = ['block', 'load'];
            const randomOf2 = Math.floor(Math.random() * 2);
            return compOptions[randomOf2];
        }
        else{
            compOptions = ['block', 'load', 'shot'];
            const randomOf3 = Math.floor(Math.random() * 3);
            return compOptions[randomOf3];
        }
    }
    function updateScore(){
        const userScore = document.querySelector('#userScore');
        const computerScore = document.querySelector('#computerScore');
        userScore.textContent = user_score;
        computerScore.textContent = comp_score;
    }
    function resetScore(){
        user_score = 0;
        comp_score = 0;
        updateScore();
        user_choice.src = '';
        computer_choice.src = '';
        infoText.innerHTML = 'Välj'
    }
    function compare (playerChoice, computerChoice){
        if(playerChoice === "shot") {
            if(computerChoice === "load") {                    
                // updateScore();
                window.onclick = resetScore();
                infoText.innerHTML = "Spelaren skjuter medan Datoren laddar. Spelaren vinner spelet";
                return;
            }
            else if(computerChoice==="block"){
                substractScoreUser();               
                updateScore();
                infoText.innerHTML = "Spelaren skjuter medan Datoren blockar. Spelaren förlorar ett skott";
                return;
            }
            else{
                substractScoreUser(); 
                substractScoreComputer();
                updateScore();
                infoText.innerHTML = "Båda spelarna skjuter. Båda spelarna förlorar ett skott"
                return;
            }
        }
        else if(playerChoice === "block") {
          
            if(computerChoice === "shot") {
                substractScoreComputer();
                updateScore();
                infoText.innerHTML = "Spelaren blockar medan Datoren skjuter. Datoren förlorar ett skott";
                return;

            }
            else if(computerChoice === "load"){                  
                addScoreComputer();
                updateScore();
                if(isShotGun(comp_score)){
                    // updateScore();
                    resetScore();
                    infoText.innerHTML = "Datoren har samlat på sig tre skott och får “Shotgun”. Datoren vinner spelet";
                    return;
                }
                else{
                    infoText.innerHTML = "Spelaren blockar medan Datoren laddar. Datoren får ett skott";
                    return;
                }

            }
            else{                
                infoText.innerHTML = "Båda spelarna blockar. Ingenting händer";
                return;

            }
        }
        else if(playerChoice === "load") {            
            
            if(computerChoice === "block") {                
                addScoreUser();   
                updateScore();
                if(isShotGun(user_score)){ 
                    // updateScore();                   
                    resetScore();
                    infoText.innerHTML = "Spelaren har samlat på sig tre skott och får “Shotgun”. Spelaren vinner spelet";
                    return;
                }
                else{
                infoText.innerHTML = "Spelaren laddar medan Datoren blockar. Spelaren får ett skott";
                return;
                }

            }
            else if(computerChoice === "shot"){               
                // updateScore();
                window.onclick = resetScore();
                infoText.innerHTML = "Spelaren laddar medan Datoren skjuter. Datoren vinner spelet";
                return;
            }
            else{
                    addScoreUser();                       
                    addScoreComputer();
                    updateScore();
                    if(isShotGun(user_score) && isShotGun(comp_score)){                        
                        resetScore();
                        infoText.innerHTML = "Spelaren och Datoren har samlat på sig tre skott och får “Shotgun”. Båda vinner spelet";
                        return;
                    }
                    else{
                        infoText.innerHTML = "Båda spelarna laddar.  Båda spelarna får ett skott";
                        return;
                    }
                
            }
        }
        
    }                
}
playGame();        

function isShotGun(score) {   
    if(score >= 3)
{
    return true;
}

return false;
} 

function disableButtonShot() {    
    if(user_score>0){
        document.getElementById('shot').disabled = false;                    
    }
    else{
        document.getElementById('shot').disabled = true;
    }                                
}

function addScoreUser() { 
    if(user_score <3){
        user_score++;   
    }
}

function substractScoreUser() {
    if (user_score > 0) {
        user_score--;
    }
}

function addScoreComputer() {    
    if(comp_score < 3){
        comp_score++;    
    }
}

function substractScoreComputer() {
    if (comp_score > 0) {
        comp_score--;
    }
}

