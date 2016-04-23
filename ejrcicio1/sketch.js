var s, m;
var GRAVITY, GRAVITY2;
var VELOCITY1, VELOCITY2;
var pisoImg, backImg, mountImg, sqrImg;
var gameover = false;
var trg = false,
  sqr = false,
  cir = false;




function setup() {
  createCanvas(windowWidth, windowHeight);
  GRAVITY = 0.3;
  GRAVITY2 = 0.3;
  VELOCITY = 0;
  VELOCITY2 = 0;

  pisoImg = loadImage("assets/piso4.png")
  backImg = loadImage("assets/back2.png")
  mountImg = loadImage("assets/piso2.png")
  sqrImg = loadImage("assets/oscar_sqr1.png")



  s2 = createSprite(0.08 * width, 0.99 * height, 0.25 * width, 0.25 * height);
  s2.addImage(pisoImg);
  s2.debug = true;
  s4 = createSprite(0.25 * width, 0.99 * height, 0.25 * width, 0.4 * height);
  s4.addImage(pisoImg);
  s4.debug = true;
  s3 = createSprite(0.43 * width, 0.9 * height, 0.25 * width, 0.4 * height);
  s3.addImage(mountImg);
  s3.debug = true;

  s5 = createSprite(0.8 * width, 0.9 * height, 0.25 * width, 0.4 * height);
  s5.addImage(mountImg);
  s5.debug = true;

  s6 = createSprite(0.98 * width, 0.99 * height, 0.25 * width, 0.25 * height);
  s6.addImage(pisoImg);
  s6.debug = true;

  s = createSprite(0.05 * width, 0.5 * height, 50, 50);
  m = createSprite(0.50 * width, 0.5 * height, 10, 10);
  m.debug = true;
  s.addAnimation("floating", "assets/HPage0.png", "assets/HPage14.png");
  s.addAnimation("moving", "assets/oscar1.png", "assets/oscar8.png");
  s.addAnimation("jump", "assets/jump1.png", "assets/jump13.png");
  s.addAnimation("triangle", "assets/oscar_tr1.png", "assets/oscar_tr3.png");
  s.addAnimation("sqr", "assets/oscar_sqr1.png");
  m.addAnimation("malo", "assets/oscarMalo1.png");


  s.setCollider("circle", 0, 0, 50);
  m.setCollider("circle", 0, 0, 55);
  s.debug = true;
}

function draw() {
  background(backImg);
  VELOCITY += GRAVITY;
  VELOCITY2 += GRAVITY2


  s.position.y += VELOCITY;
  m.position.y += VELOCITY2;


  if (s.collide(s2) || s.collide(s3) || s.collide(s4) || s.collide(s5) || s.collide(s6)) {

    VELOCITY = 0;
    GRAVITY = 0;
    trg = false;
    sqr = false;

  } else {
    GRAVITY = 0.3;
  }
  if (m.collide(s3) || m.collide(s2) || m.collide(s4)) {
    //if ( m.collide(s3)) {

    VELOCITY2 = 0;
    GRAVITY2 = 0;
    // }
  } else {
    GRAVITY2 = 0.3;
  }



  if (keyWentDown('UP') && trg === false) {
    s.changeAnimation("triangle");
    VELOCITY = -15;
    GRAVITY = 0.3;
    trg = true;
  }
  if ((keyWentDown('c') || keyWentDown('C')) && trg === true) {
    s.changeAnimation("sqr");
    s.mirrorX(-1);

    VELOCITY = +15;
    GRAVITY = 0.3;
    sqr = true;
  }
  if (keyWentUp('c') || keyWentUp('C')) {
    s.changeAnimation("floating");
    s.velocity.x = 0;
  }
   m.velocity.x = -2;
  //if (m.position.x == 0.36 * width) {
   // m.velocity.x = 2;
  //} //else if (m.position.x == 0.56 * width){
   // m.velocity.x = -2;
     //}

if (s.position.y > windowHeight) {
  s.position.y = 0.5 * height;
  s.position.x = 0.1 * width;
}
if(s.collide(m) && sqr === true){
 m.position.y = 1.5 * height;
}
else if (s.collide(m)) {
  s.position.y = 0.5 * height;
  s.position.x = 0.1 * width
}
drawSprites();
}

function keyPressed() {
  if (keyCode == LEFT_ARROW && cir === false) {
    s.changeAnimation("moving");
    s.mirrorX(-1);
    s.velocity.x = -3;
  } else if (keyCode == RIGHT_ARROW) {
    s.changeAnimation("moving");
    s.mirrorX(1);
    s.velocity.x = 3;
  } else {
    s.changeAnimation("floating");
    s.velocity.x = 0;
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    s.changeAnimation("floating");
    s.velocity.x = 0;
  }
}