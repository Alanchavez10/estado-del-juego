var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, grupoObstaculos;

var INICIO =1;
var FIN =0;
var estadoDelJuego =INICIO;
var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  obstaculo1=loadImage("obstacle1.png");
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  cloudsGroup= new Group();
  grupoObstaculos = new Group();
  console.log("Hola"+ 5)
  
}

function draw() {
  background(180);
  
  if(estadoDelJuego === INICIO){
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(grupoObstaculos.isTouching(trex)){
      estadoDelJuego =FIN;
    }
  }
else if(estadoDelJuego === FIN){
trex.velocityY =0;
ground.velocityX =0;
cloudsGroup.setVelocityXEach(0);
grupoObstaculos.setVelocityXEach(0);
}

  
  
  
  
  trex.collide(invisibleGround);
  
  //aparecer nubes
  spawnClouds();
  crearObstaculos();
  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 200;
    cloudsGroup.add(cloud);
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function crearObstaculos(){
  var obstaculo;
  var numero=0;
  if (frameCount % 60 === 0) {
    obstaculo=createSprite(600,160,10,40);
    numero=Math.round(random(1,6));
    switch(numero) {
      case 1: obstaculo.addImage(obstaculo1); break;
      case 2: obstaculo.addImage(obstaculo2); break;
      case 3: obstaculo.addImage(obstaculo3); break;
      case 4: obstaculo.addImage(obstaculo4); break;
      case 5: obstaculo.addImage(obstaculo5); break;
      case 6: obstaculo.addImage(obstaculo6); break;
      default:break;
    }
    obstaculo.velocityX=-8;
    obstaculo.scale=0.5;
    obstaculo.lifetime=200;
    grupoObstaculos.add(obstaculo);
  }
}