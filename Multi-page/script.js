let rulebutton = document.getElementById('rules');
let closebox = document.getElementById('close');
let rulebox = document.getElementById('rulebox');
let computerScore = document.getElementById('computer_score');
let yourScore = document.getElementById('your_score');

//Gets the score from local storage
if (window.localStorage.getItem('score')){
    let score=JSON.parse(window.localStorage.getItem('score'));
    yourScore.textContent=score.yourScore;
    computerScore.textContent=score.computerScore;
}

// Event Listner for rules button
rulebutton.addEventListener('click', () => {
    rulebox.style.display = "block";
    closebox.style.display = "flex";
});

//Event listner for close button
closebox.addEventListener('click', () => {
    rulebox.style.display = "none";
    closebox.style.display = "none";
});


//Event listner for rock, paper, scissor  buttons
let clicked=document.querySelectorAll('.game');
clicked.forEach((click)=>{
    click.addEventListener('click', ()=>{
        let userChoice=click.id;
        let pcChoice= generateComputerChoice();
        let winner=checkWinner(userChoice,pcChoice);

        const result={
            userChoice,
            pcChoice,
            winner,
        }
        
        window.localStorage.setItem('result',JSON.stringify(result));    //Saves to local storage as JSON entity

        window.location.href = 'winingpage.html'
    });
});


//Generating random number
function generateComputerChoice(){
    let button=document.getElementsByClassName('game');
    let random=Math.floor(Math.random()*3);
    return(button[random].id);
}


//Checks the winner
function  checkWinner(userChoice,pcChoice){
    if(userChoice ===  pcChoice){
        return("tie");
    } else if (choice[userChoice] === pcChoice){
        return("user");
    } else {
        return("pc");
    }
}

//Logic 'what':'beats what'
const choice={
    "paper" : "rock",
    "rock" : "scissor",
    "scissor" : "paper",
}