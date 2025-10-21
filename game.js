let newBtn = document.querySelector("#new");
let msg= document.querySelector("#msg");
let msgCont= document.querySelector(".msg-cont");
let boxes= document.querySelectorAll(".box");
let reset= document.querySelector("#reset");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");
const scoreOEl = document.getElementById("score-o");
const scoreXEl = document.getElementById("score-x");

let scoreO = 0;
let scoreX = 0;
let turn0= true;


let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();
        if (turn0) {
            box.innerHTML="0";
            turn0=false;
        } else {
            box.innerHTML="X";
            turn0=true;
        }
        box.classList.add("clicked");
        box.disabled=true;
        checkWinner();
        
    });
});

const resetGame=()=>{
    turn0= true;
    enableBtn();
    msgCont.classList.add("hide");
}

const disableBtn=()=>{
    for (let box of boxes) {
        box.disabled= true;        
    }
}

const enableBtn=()=>{
    for (let box of boxes) {
        box.classList.remove("clicked", "win");
        box.disabled= false; 
        box.innerText="";
               
    }
}

const showWinner=(winner,pattern) =>{
    if (winner === "0") {
        scoreO++;
        scoreOEl.innerText = scoreO;
    } else {
        scoreX++;
        scoreXEl.innerText = scoreX;
    }
    winSound.play();
    msg.innerHTML=`<b>Congratulations, Winner is ${winner} </b>`;
    msgCont.classList.remove("hide");
    pattern.forEach((index) => {
        boxes[index].classList.add("win");
    });
    disableBtn();
}






const checkWinner=() => {
    let winnerFound = false;
     for( let pattern of winPatterns){
         let pos1Val= boxes [pattern[0]].innerText;
         let pos2Val=boxes [pattern[1]].innerText;
         let pos3Val=boxes [pattern[2]].innerText;

         if(pos1Val!="" && pos2Val!="" && pos3Val!="" ){
            if (pos1Val===pos2Val && pos2Val==pos3Val) {
                console.log(`Congratulations ${pos1Val} has Won!!!`);
                showWinner(pos1Val,pattern);
                winnerFound= true;
                break;
            }
            
         }
    }
    if (!winnerFound){
        let allFilled= true;
        boxes.forEach((box)=>{
            if (box.innerText ===""){
                allFilled= false;
            }
        });
        if(allFilled){
            drawSound.play();
            msg.innerHTML=`<b>The game is a draw </b>`;
            msgCont.classList.remove("hide");
            disableBtn();
        }
    }
};
newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", () => {
    scoreO = 0;
    scoreX = 0;
    scoreOEl.innerText = scoreO;
    scoreXEl.innerText = scoreX;
    resetGame();
});