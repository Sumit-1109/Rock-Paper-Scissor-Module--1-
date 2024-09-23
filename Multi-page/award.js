let playagain=document.getElementById('playagain');


let trophyArea=document.getElementById('trophyArea')

for (let i = 1; i <= 8; i++) {
  let star = document.createElement('img');
  star.className = 'star';
  star.id = `star${i}`;
  star.src='./images/Star.png'
  
  trophyArea.appendChild(star);
}
