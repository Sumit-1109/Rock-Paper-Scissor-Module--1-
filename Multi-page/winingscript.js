let rulebutton = document.getElementById('rules');
let closebox = document.getElementById('close');
let rulebox = document.getElementById('rulebox');
let computerScore = document.getElementById('computer_score');
let yourScore = document.getElementById('your_score');
let main=document.getElementById('win');
let playagain=document.getElementById('playagain');
let person=document.getElementById('outcome');
let against=document.getElementById('against');

// Event listners for Rules button
rulebutton.addEventListener('click', () => {
    rulebox.style.display = "block";
    closebox.style.display = "flex";
});

// Event listners for Close button
closebox.addEventListener('click', () => {
    rulebox.style.display = "none";
    closebox.style.display = "none";
});

// Retrieve result object from local Storage
const result=JSON.parse(window.localStorage.getItem('result'));

//Retrieves scores from local storage
if (window.localStorage.getItem('score')){
let score=JSON.parse(window.localStorage.getItem('score'));
yourScore.textContent=score.yourScore;
computerScore.textContent=score.computerScore;
}


if (result){
    const { userChoice, pcChoice, winner} = result;

    createNextButton(winner);

    outcomeDecider(userChoice, pcChoice, winner);

    updateScores(winner);

    displayChoice('user',userChoice, winner);
    displayChoice('pc',pcChoice, winner);
}


// Shows the outcome
function outcomeDecider(userChoice, pcChoice, winner){
    if (winner === 'user'){
        person.textContent = "YOU WIN";
    } else if (userChoice === pcChoice){
        person.textContent = "TIE UP";
        against.textContent = ''
    }
}

//Play again button
playagain.addEventListener('click',()=>{
    window.location.href= 'index.html'
})


// Next button
function createNextButton(winner){
    if(winner == 'user'){
        let next=document.createElement('button')
        next.classList.add('next');
        next.textContent= "NEXT";
        next.addEventListener('click',()=>{
            window.location.href = "award.html";
        })
        rulebutton.style.right='12vw';
        main.appendChild(next);

    }
}


//Score Updation
function updateScores(winner){

    if  (winner === 'user'){
        yourScore.textContent = parseInt(yourScore.textContent) + 1;
    } else if  (winner === 'pc'){
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    };

    let score={
        yourScore : yourScore.textContent,
        computerScore : computerScore.textContent,
    }

    window.localStorage.setItem('score', JSON.stringify(score));
};


//Shows the choices made by the user and the pc
function displayChoice(personID, choice, winner){
    let container = document.getElementById(personID);

    container.innerHTML = '';

    let label = document.createElement('p');
    label.classList.add('picked-label');
    label.textContent = personID === 'user' ? 'YOU PICKED' : 'PC PICKED';
    container.appendChild(label);

    let button = document.createElement('button');
    button.classList.add('game');
    button.id=choice;

    let img=document.createElement('img');
    img.src = `./images/${choice}.png`
    img.alt = choice;
    button.appendChild(img);
    container.appendChild(button);

    if (winner === personID){
        let circle1 = document.createElement('div');
        circle1.classList.add('highlight', 'circle1');

        let circle2 = document.createElement('div');
        circle2.classList.add('highlight', 'circle2');

        let circle3 = document.createElement('div');
        circle3.classList.add('highlight', 'circle3');

        container.appendChild(circle1);
        container.appendChild(circle2);
        container.appendChild(circle3);
    }
}

