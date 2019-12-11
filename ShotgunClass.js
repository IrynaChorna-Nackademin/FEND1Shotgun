class Player{
    constructor(score){
        this.score=score;
    }

    isShotGun() {   
        if(this.score >= 3){
            return true;
        }    
        return false;
    }  
    substractScore() {
        if (this.score > 0) {
            this.score--;
        }
    }
    addScore() {    
        if(this.score < 3){
            this.score ++;    
        }
    }
    disableButtonShot() {    
        if(this.score>0){
            document.getElementById('shot').disabled = false;                    
        }
        else{
            document.getElementById('shot').disabled = true;
        }                                
    }
    updateScore(){
        const userScore = document.querySelector('#userScore');
        userScore.textContent = this.score;       
    }
    resetScore(){
        this.score = 0;
        this.updateScore();        
    }
}
class Computer extends Player{
    constructor(score){
        super(score)
    }
    getOption()
    {
        let compOptions;
        if(this.score <= 0){
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
    updateScore(){
        const computerScore = document.querySelector('#computerScore');
        computerScore.textContent = this.score;
    }
}
class Choice{
    constructor(playerChoice, computerChoice){
        this.playerChoice = playerChoice;
        this.computerChoice = computerChoice;
    }

    Compare(){
        
        if(player.isShotGun() && computer.isShotGun()){                        
            player.resetScore();
            computer.resetScore();
            infoText.innerHTML = "Spelaren och Datoren har samlat på sig tre skott och får “Shotgun”. Båda vinner spelet";
            return;
        }
        else if(computer.isShotGun()){
            computer.resetScore();
            player.resetScore();
            infoText.innerHTML = "Datoren har samlat på sig tre skott och får “Shotgun”. Datoren vinner spelet";
            return;
        }
        else if(player.isShotGun()){ 
            player.resetScore();
            computer.resetScore();
            infoText.innerHTML = "Spelaren har samlat på sig tre skott och får “Shotgun”. Spelaren vinner spelet";
            return;
        }
        
        if(this.playerChoice === "shot") {
            if(this.computerChoice === "load") {                    
                window.onclick = player.resetScore();
                computer.resetScore()
                infoText.innerHTML = "Spelaren skjuter medan Datoren laddar. Spelaren vinner spelet";
                return;
            }
            else if(this.computerChoice==="block"){
                player.substractScore();               
                player.updateScore();
                infoText.innerHTML = "Spelaren skjuter medan Datoren blockar. Spelaren förlorar ett skott";
                return;
            }
            else{
                player.substractScore(); 
                computer.substractScore();
                player.updateScore();
                computer.updateScore();
                infoText.innerHTML = "Båda spelarna skjuter. Båda spelarna förlorar ett skott"
                return;
            }
        }
        else if(this.playerChoice === "block") {
          
            if(this.computerChoice === "shot") {
                computer.substractScore();
                computer.updateScore();
                infoText.innerHTML = "Spelaren blockar medan Datoren skjuter. Datoren förlorar ett skott";
                return;

            }
            else if(this.computerChoice === "load"){                  
                computer.addScore();
                computer.updateScore();
                                
                infoText.innerHTML = "Spelaren blockar medan Datoren laddar. Datoren får ett skott";
                return;
                

            }
            else{                
                infoText.innerHTML = "Båda spelarna blockar. Ingenting händer";
                return;

            }
        }
        else if(this.playerChoice === "load") {            
            
            if(this.computerChoice === "block") {                
                player.addScore();   
                player.updateScore();                                
                infoText.innerHTML = "Spelaren laddar medan Datoren blockar. Spelaren får ett skott";
                return;                
            }
            else if(this.computerChoice === "shot"){               
                window.onclick = player.resetScore();
                computer.resetScore();
                infoText.innerHTML = "Spelaren laddar medan Datoren skjuter. Datoren vinner spelet";
                return;
                }
                else{
                    player.addScore();                       
                    computer.addScore();
                    player.updateScore();
                    computer.updateScore();

                    infoText.innerHTML = "Båda spelarna laddar.  Båda spelarna får ett skott";
                    return;
            }
        }      
    }
}
class Game{
    constructor(){
        
    }
    
    Play(){
        const choiceButtons = document.querySelectorAll('.choice button');
        const user_choice = document.querySelector('.userChoice');
        const computer_choice = document.querySelector('.computerChoice');
        const reset = document.getElementById('reset');                

        choiceButtons.forEach(button => {
            button.addEventListener('click', function(){                
                let computerChoice = computer.getOption();
                let choices = new Choice(this.id, computerChoice);                
                choices.Compare();
    
                player.disableButtonShot(); 
                
                user_choice.src = `./image/${this.id}.png`;
                computer_choice.src = `image/${computerChoice}.png`;
            });
        });        
                
        reset.addEventListener('click', function(){
            player.resetScore();
            computer.resetScore();
            user_choice.src = '';
            computer_choice.src = '';
            infoText.innerHTML = 'Välj';
        });
    }    
}
const infoText = document.querySelector('.choice h3');
document.getElementById('shot').disabled = true;

var player = new Player(0);
var computer = new Computer(0);
var playGame = new Game();
playGame.Play();