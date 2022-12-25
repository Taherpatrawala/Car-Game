const score= document.querySelector('.score');
const startScreen=document.querySelector('.start-screen');
const gameArea=document.querySelector('.game-area');
const klick= document.querySelector('body'); 
startScreen.addEventListener('click',startGame);

document.addEventListener('keyup', keyUp);  //keyup means which key was released, obviously the one which was pressed
document.addEventListener('keydown',keyDown);//Keydown means which key was pressed

let keys={ArrowUp:false, ArrowDown:false,ArrowLeft:false,ArrowRight:false}
let player={speed:5,score:0};

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    //console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}

(function(){ 
  klick.addEventListener('keyup', e=>{
     if(e.keyCode===32){
        if(player.speed==5){
             player.speed=0;
             
        }

        else{
            player.speed=5;
            console.log('yup');
        }
       
         
     }
    });
})(); //IIFE for Pausing or Resuming the Game...




function startGame(){
    player.startGame=true;
    player.score=0;
 
    window.requestAnimationFrame(gamePlay);
    startScreen.classList.add('hide');
   // gameArea.classList.remove('hide');
   gameArea.innerHTML='';

    for( let x=0;x<5;x++){
        let stripe=document.createElement('div');
        stripe.setAttribute('class','stripe');
        stripe.y=(x*150);
        stripe.style.top= `${stripe.y}px` ;
        gameArea.appendChild(stripe);
       
       }

    for(let x=0;x<6;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemyCar');
        gameArea.appendChild(enemyCar);
      //  enemyCar.innerText="Enemy";
        enemyCar.y=((5*x)*(-350) );
        enemyCar.style.top=`${enemyCar.y}px`
        enemyCar.style.left=Math.ceil(Math.random()*350)+"px";
    }
    

    let car=document.createElement('div');
    car.setAttribute('class','car');
  //  car.innerText="This is a Car, Accept It!!!";
    gameArea.appendChild(car);

 
    player.x=car.offsetLeft; //Setting a proprty 'x' in player object to determine horizontal position of the car.
    player.y=car.offsetTop;

   
 
     
}

function movelines(){
        let lines=document.querySelectorAll('.stripe');
      
        lines.forEach(function(item) {

        if(item.y>700){
            item.y-=750;
        }    
          item.y+=player.speed; 
          item.style.top=item.y + "px";
        });
    
       }

function moveEnemy(car){
    let enemies=document.querySelectorAll('.enemyCar');
   
    enemies.forEach(function(item){
       
        if(item.y>800){
            item.y=-300;
            item.style.left=Math.ceil(Math.random()*350)+"px";
        }   
        item.y+=player.speed;
        item.style.top=item.y + "px";
       
        if(collision(car,item)){
            console.log("You just got hit!");
            endGame();
        }
    });


}

function collision(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.top>bRect.bottom) || (aRect.left>bRect.right) ||(aRect.bottom<bRect.top) || (aRect.right<bRect.left) );
}

function endGame(){
    player.startGame=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML=`Game Over :( <br>Your score was ${player.score} <br><br> Click here to retry`;
   
    
}
       

function gamePlay(){

   if(player.startGame) {window.requestAnimationFrame(gamePlay);
    movelines();
    
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    
    moveEnemy(car);

    if(keys.ArrowUp && player.y>177){player.y-= player.speed};
    if(keys.ArrowDown && player.y<(road.bottom-50)){player.y+= player.speed};
    if(keys.ArrowLeft && player.x>-100){player.x-=player.speed};
    if(keys.ArrowRight && player.x<road.width-150){player.x+= player.speed};

    car.style.top=player.y+ 'px';
    car.style.left=player.x+ 'px';

    if(player.speed==5){ 
        score.innerHTML="Score: "+player.score++;
    }
   
  

    }
   // console.log("I got clicked"); 

}


var audio=new Audio('/material/zelda.mp3');
audio.play(); 