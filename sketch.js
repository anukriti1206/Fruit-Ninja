//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var enemy,enemy1,enemy2,enemyGroup;
var score;
var gameOverSound,knifeSwoosh;

function preload(){
   
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  enemy1 = loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
  
  gameOverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwooshSound.mp3");
  
 
}

function setup(){

  createCanvas(600,600);
  
  //creating the sword
  sword = createSprite(50,300,50,50);
  sword.addImage(swordImage);
  sword.scale = 0.6;
   
  //setting a collider radius to the sword
  sword.setCollider("circle",0,0,30);
  
  //creating the fruits and enemies group
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  //setting the initial score
  score = 0;
  
  
  
}

function draw(){
  background('lightGreen');

  if(gameState == PLAY){
    
    //make the sword move with the mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    //calling the fruits and enemies function
    fruits();
    enemies();
    
    //increase the score if sword is touching the fruit
    if(sword.isTouching(fruitGroup)){
    
      fruitGroup.destroyEach();
      score = score + 1;
      knifeSwoosh.play();
    }
  
    //end the game if sword is touching the enemy
    if(sword.isTouching(enemyGroup)){
    
      gameState = END;
      gameOverSound.play();
    }
    
  }
  else if(gameState == END){
    
    //make the fruits and enemies disappear and stop their velocity
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    
    background("black");
    textSize(20);
    textFont("georgia");
    text("Game Over", 250,300);
    
    
    //gameOverSound.play();
  
    
  }
  

  
  drawSprites();
  
  //display the score
  textSize(15);
  textFont("georgia");
  text("Score : "+score,530,30)
}

function fruits(){
  
  //creating the fruits
  if(frameCount % 50 == 0){
    
    fruit = createSprite(550,200,50,50);
    fruit.scale = 0.2;
        
    //giving random animation to the fruit sprite
    var rand = Math.round(random(1,4));
    if(rand == 1){
      fruit.addImage(fruit1);
    }
    else if(rand == 2){
      fruit.addImage(fruit2);
    }
    else if(rand == 3){
      fruit.addImage(fruit3);
    } 
    else if(rand == 4){
      fruit.addImage(fruit4);
    }
    //to make the fruits appear from both the sides
     position = Math.round(random(1,2));
     if(position == 1){
       fruit.x = 0;
       fruit.velocityX = (15+score/4);
     }
     if(position == 2){
       
       fruit.x = 550;
       fruit.velocityX = -(15+score/4);
     }
    
    
    //giving random y position to the fruits
    fruit.y = Math.round(random(50,400));
    
    //giving the lifetime
    fruit.lifetime = 120;
    
    //adding it to the fruit group
    fruitGroup.add(fruit);
     
  }
}

function enemies(){

  //creating the enemies
  if(frameCount%100 == 0){
    enemy = createSprite(550,200,50,50);
    
    //giving random animation to the enemy sprites
    var r = Math.round(random(1,2));
    if(r == 1){
      enemy.addImage(enemy1);
    }
    if(r == 2){
      enemy.addImage(enemy2);
    }
    
    //giving random y positions to the enemies
    enemy.y = Math.round(random(50,400));
    
    //giving velocity and lifetime
    enemy.velocityX = -(12+score/10);
    enemy.lifetime = 100;

    //adding it to the enemy group
    enemyGroup.add(enemy);
    
  }
  
  
}



