//Load DOM elements
let pcScore=document.getElementById('pcScore');
let userScore=document.getElementById('userScore');
let rulesButton=document.getElementById('rules');
let nextButton=document.getElementById('nextButton');
let ruleDialogBox=document.getElementById('rulebox');
let closeButton=document.getElementById('close');
let choices=document.querySelectorAll('.choices');
let choicesArea=document.getElementById('choicesArea');
let resultArea=document.getElementById('resultArea');
let outcome=document.getElementById('outcome');
let against=document.getElementById('against');
let playAgain=document.getElementById('playAgain');
let userResultDivision=document.getElementById('user');
let pcResultDivision=document.getElementById('pc');
let awardArea=document.getElementById('awardArea');
let rockpaperscissor=document.getElementById('rockpaperscissor');
let awardPlayAgain=document.getElementById('awardPlayAgain');
let trophyArea=document.getElementById('trophyArea');

//Retrieves scores from local storage
if (window.localStorage.getItem('score')){
let score=JSON.parse(window.localStorage.getItem('score'));
userScore.textContent=score.userScore;
pcScore.textContent=score.pcScore;
} else{
    userScore.textContent='0';
    pcScore.textContent='0';
}


//Event listner for the RULES button
rulesButton.addEventListener('click',()=>{
    ruleDialogBox.style.display='block';
    closeButton.style.display='flex';
});
//Event Listner for the 'X' button
closeButton.addEventListener('click',()=>{
    ruleDialogBox.style.display='none';
    closeButton.style.display='none';
});


// When user clicks on a choice(Rock, Paper, Scissor)
choices.forEach(choice => {
    choice.addEventListener('click',()=>{
        let userChoice=choice.id;

        let pcChoice=generateComputerChoice();  //Generates Computer Choice

        let winner=decideWinner(userChoice,pcChoice);  //Decides the winner according to logic

        updateScores(winner);    // Updates the scores in the scoreboard and stores to local storage

        showResult(userChoice,pcChoice,winner);    //Shows the result on Result Page

        //Adds next button
        if (winner === 'user'){
        addNextButton();
        }  
    })
});

//Generate Computer Choice function
function generateComputerChoice(){
    let randomNum=Math.floor(Math.random()*3)
    return choices[randomNum].id;
}

//Decide the winner
function decideWinner(userChoice,pcChoice){
    if(userChoice === pcChoice){
        return 'tie';
    } else if(logic[userChoice] === pcChoice){
        return 'user';
    } else {
        return 'pc';
    }
};


//Logic "what" : "beats what"
const logic={
    "paper" : "rock",
    "rock" : "scissor",
    "scissor" : "paper",
}


// Result page Middle container, that shows the result
function showResult(userChoice,pcChoice,winner){
    hideGameArea();

    displayChoices('pc',pcChoice, winner);
    displayChoices('user',userChoice,winner);
    

    if(winner === 'tie'){
        outcome.textContent='TIE UP';
        against.textContent= '';
    } else if(winner === 'user'){
        outcome.textContent='YOU WIN';
        against.textContent= 'AGAINST PC';
    } else if (winner === 'pc'){
        outcome.textContent='YOU LOST';
        against.textContent= 'AGAINST PC';
    }
}


//Hides intial page to show result page
function hideGameArea(){
    choicesArea.style.display = 'none';
    resultArea.style.display='grid';
}


//Display choice buttons in the result page
function displayChoices(personID, choice, winner){
    let container=document.getElementById(personID)
    
    container.innerHTML='';

    let selected=document.getElementById(choice).cloneNode(true)
    container.appendChild(selected)
    selected.classList.add('winner')

    let label=document.createElement('p');
    label.classList.add('label', 'roboto-medium');
    label.textContent= personID === 'user' ? 'YOU PICKED' : 'PC PICKED';
    container.append(label);


    //Adds circles for animation behind the winner's choice in the result result area 
    if (winner === personID) {
        for (let i = 1; i <= 6; i++) {
            let circle = document.createElement('div');
            circle.classList.add('highlight', `circle${i}`);
            container.appendChild(circle);
        }
    }

}


//Play again button
playAgain.addEventListener('click',()=>{
    resultArea.style.display='none';
    choicesArea.style.display='grid';
    rulesButton.classList.remove('after');
    rulesButton.classList.add('before');
    nextButton.style.display='none';
})

// Award page play again button
awardPlayAgain.addEventListener('click',()=>{
    awardArea.style.display='none';
    resultArea.style.display='none';
    rulesButton.classList.remove('after');
    rulesButton.classList.add('before');
    nextButton.style.display='none';
    rockpaperscissor.style.display='grid';
    choicesArea.style.display='grid';
})


//Add next button
function addNextButton(){
    rulesButton.classList.add('after');
    nextButton.style.display='block';
}

//Next button function
nextButton.addEventListener('click',()=>{
    rockpaperscissor.style.display='none';
    awardArea.style.display='grid';
    rulesButton.classList.remove('after');
    rulesButton.classList.add('before');
    nextButton.style.display='none';
    
    for (let i = 1; i <= 8; i++) {
    let star = document.createElement('img');
    star.className = 'star';
    star.id = `star${i}`;
    star.src='./images/Star.png'
  
    trophyArea.appendChild(star);
}
});


//Update Score
function updateScores(winner){
    if  (winner === 'user'){
        userScore.textContent = parseInt(userScore.textContent) + 1;
    } else if  (winner === 'pc'){
        pcScore.textContent = parseInt(pcScore.textContent) + 1;
    };

    let score={
        userScore : userScore.textContent,
        pcScore : pcScore.textContent,
    }

    //Store the scores to Local Storage
    window.localStorage.setItem('score', JSON.stringify(score));
}

