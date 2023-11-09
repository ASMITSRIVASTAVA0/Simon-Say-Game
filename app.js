//koi bhi key press to game start
//btn flash ho level 1 likh ke aaye

//gamesequence=["yellow","green",...], 
//usersequence
//agar same sequence to levelup else gameover

//btn press to check usersequence ==gamesequence
console.log("asmit");
let gameSeq=[];
let userSeq=[];

//arr of class name bnai 
let btns=["red","yellow","green","purple"];

let started=false;
let level=0;
let h2=document.querySelector("h2");

//pure document me koi key press to eventlistener activate
//keyboard ki key press
document.addEventListener("keypress",function(){
    // console.log("game stated");
    if(started==false)//first time hi ye chale
    {
        console.log("game is started");
        started=true;

        //jaise hi start to level up
        levelUp();
    }

});

function levelUp(){
    //jb level up to userSeq reset taki user shure se yaad krke vahi seq bhare
    //jo gameSseq me h
    userSeq=[];
    //kyuki gameSeq console krwa rhe to jeetna h to usse dekh ke bharte janA

    //teen kaam,level up,h2 k text change,btn flash
    level++;
    h2.innerText=`Level ${level}`;
    
    //at random,1 btn flash
    let randIdx=Math.floor(Math.random()*3);
    let randColorClass=btns[randIdx];
    let randBtn=document.querySelector(`.${randColorClass}`);
    
    //el baar hi push hua
    gameSeq.push(randColorClass);
    // console.log(gameSeq);
    gameFlash(randBtn);
    //jb bhi level up to btn flash

}
//jb btn click
function gameFlash(btn)
{
    btn.classList.add("flash");
    //add kiya thodi deer baad remove
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn)
{
    btn.classList.add("userFlash");
    //add kiya thodi deer baad remove
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

//iske andar curruserSeq ko pass
// function checkAns(){
function checkAns(idx){
    //ans sahi y nhi har level me aake checkjj
    console.log("curr level=",level);
    //jo gameSeq aur userSeq k size ,vahi level 

    //agar idx mid me kahi to kux nhi,last me to level up aur check val of both seq
    // let idx=level-1;


    if(userSeq[idx]==gameSeq[idx])
    {
        console.log("same value");
        if(userSeq.length==gameSeq.length)//user ke uthni hi val enter jitni gameseq me
        {
            // levelUp();//phir se koi new
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        h2.innerText=`Game Over! Score=${level}, Press any keyboard key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        //ye color thodi deer baad khatam
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        //ye start ko false aur game seq ko []
        reset();
    }

}

//jb koi btn press
function btnPress(){
    // console.log("btn was pressed");
    //find which btn pressed
    // console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor=this.getAttribute("id");//this==btn,i.e. btn k 
    console.log("usercolor",userColor);//get attribute mtlb us btn ke attribute ki value
    //kyuki id ki value aur classlist me ek class k naam same to string match kro
    userSeq.push(userColor);
    console.log(userSeq);

    //jaise hi btn press ans check kro
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}