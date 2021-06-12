var bow,arrow,scene,score;
var PLAY=1;
var END=0;
var gameState=1;
var bowImg,arrowImg,boardImg,boardImg1,backgroundImg; 

 
function preload(){
bowImg= loadImage("bow0.png");
backgroundImage = loadImage("sprite_0-1.png");
arrowImage = loadImage("arrow0.png");
boardImg=loadImage("sprite_0.png");
board1Img=loadImage("sprite_1.png");

}

function setup() {
   createCanvas(500,500);
  
  scene = createSprite(0,0,250,250);
  scene.addImage(backgroundImage);
  scene.scale=2.5;
  bow = createSprite(480,210,50);
  bow.addImage(bowImg); 
  bow.scale = 1;
  score = 0;
  
  arrowGroup= new Group();
  boardGroup=new Group();
}

function draw() {
    background("black");
 
   if (gameState===PLAY) {
    
  scene.velocityX=-3;
  
  if (scene.x < 0){
      scene.x = scene.width/2;
    }
  //moving bow
  bow.y = World.mouseY;
  
  if(keyDown("space")){
      createArrow();  
  }
     if(frameCount%60===0){
       board();
     }
    if(arrowGroup.isTouching(boardGroup)){
      score+=50;
      arrowGroup.destroyEach();
    }
     drawSprites();
     if(score===500){
       gameState=END;
     } 
   }
    if(gameState===END){
   
    scene.velocityX=0;
    boardGroup.destroyEach();
    arrowGroup.destroyEach();
    
    
 fill("yellow");
    textSize(30);
    text("GAMEOVER",150,250);   
    if(keyDown("r")){
      reset();
    }
    }

   textSize(25);
   fill("yellow");
  text("Score :"+ score,150,50);
    
}
  
  
  

function reset(){
  gameState= PLAY;
  score=0;
  
}
function createArrow() {
  var arrow= createSprite(100, 100, 10, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -10 ;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  arrow.setCollider("rectangle",0,0,10,10);
   arrow.debug=false;
}
  function board(){
    if(frameCount%60===0){
  var board= createSprite(0,0 , 10, 10);
  board.addImage(boardImg);
  board.x = 60;
  board.y=0;
var rand= Math.round(random(1,2));
    
    switch(rand) {
      case 1: board.addImage(boardImg); 
              break;
      case 2: board.addImage(board1Img);
              break;
      default: break;
    }
    
    board.x= Math.round(random(100,40)); 
  board.velocityY=5;
  board.lifetime = 500;
  board.scale = 0.3;
  boardGroup.add(board);
}
  board.setCollider("rectangle",0,0,board.width,board.height);
  board.debug = true;
  }