/*
  GAME PROJECT PART 5- MULTIPLE INTREACTABLES
 */
//creating  global variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var mountain;
var cloud;
var treePos_x;
var treePos_y;
var cameraPosX;
var mountainx;
var cloudx;
var treex;
var collectables;
var canyons;
var game_score;
var flagpole;
var lives;
var platforms;
var enemies;
var mysound;

//preloading the sound track
function preload() {
  soundFormats('mp3', 'wav');
    mysound= loadSound("assets/mario_jump.wav");
    mysound.setVolume(0.1);
}
//setup function
function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  startgame();
}
//start game function
function startgame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
   
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  treePos_x = 400;
  treePos_y = height / 2;
  cameraPosX = 0;

  collectables = [
    {
      x_pos: 100,
      y_pos: 400,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 550,
      y_pos: 400,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 850,
      y_pos: 400,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 1150,
      y_pos: 400,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 1080,
      y_pos: floorPos_y - 265,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 780,
      y_pos: floorPos_y - 140,
      isFound: false,
      size: 40,
    },
    {
      x_pos: 440,
      y_pos: floorPos_y - 230,
      isFound: false,
      size: 40,
    },
  ];

  mountain = {
    x: 250,
    y: 400,
  };

  canyons = [
    {
      x_pos: 110,
      width: 435,
    },
    {
      x_pos: 610,
      width: 435,
    },
    {
      x_pos: 1010,
      width: 435,
    },
  ];

  cloud = {
    x: 50,
    y: 100,
    size: 50,
  };

  mountainx = [-900, -600, -300, 0, 300, 600, 900, 1200, 1500];
  cloudx = [-900, -600, -300, 0, 300, 600, 900, 1200, 1500];
  treex = [-900, -600, -300, 0, 300, 600, 900, 1200, 1500];
  game_score = 0;
  flagpole = { isreached: false, x_pos: 1700 };
  platforms = [];
  platforms.push(createplatforms(200, floorPos_y - 70, 100));
  platforms.push(createplatforms(10, floorPos_y - 70, 60));
  platforms.push(createplatforms(80, floorPos_y - 130, 60));
  platforms.push(createplatforms(280, floorPos_y - 140, 100));
  platforms.push(createplatforms(420, floorPos_y - 200, 100));

  platforms.push(createplatforms(720, floorPos_y - 70, 100));
  platforms.push(createplatforms(770, floorPos_y - 130, 100));
  platforms.push(createplatforms(860, floorPos_y - 170, 100));
  platforms.push(createplatforms(930, floorPos_y - 200, 100));
  platforms.push(createplatforms(1040, floorPos_y - 250, 100));
  enemies = [];
  enemies.push(enemie(20, floorPos_y - 10, 50));
  enemies.push(enemie(200, floorPos_y - 10, 250));
  enemies.push(enemie(1150, floorPos_y - 10, 200));
}

function draw() {
  ///////////DRAWING CODE//////////
  if (isRight == true && isPlummeting == false) {
    cameraPosX = cameraPosX + 4;
  }
  if (isLeft == true && isPlummeting == false) {
    cameraPosX = cameraPosX - 4;
  }
  console.log(gameChar_x);

  background(102, 102, 255); //fill the sky blue

  noStroke();
  fill(0, 204, 204);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  //displaying score
  fill(255);
  noStroke();
  text("score: " + game_score, 20, 20);
  //display lives
  fill(255);
  noStroke();
  text("Lives :" + lives, 155, 20);

  //conditonal stament for lives for gameover and level complete
  if (lives <= 0) {
    fill(255,0,230);
    isLeft = false;
    isRight = false;
    text("Game Over", 480, 30);
    text("Press Space to Play Again", 460, 50);
     if(keyCode==32){
      lives=3;
      startgame();
    }
  }
  if (flagpole.isreached) {
    fill(240,230,240);
    isLeft = false;
    isRight = false;
    text("Level Complete", 400, 20);
    text("Press Space to Play Again", 460, 50);
    if(keyCode==32){
     lives=3;
     startgame();
   }

  }

  push();
  translate(-cameraPosX, 0);
  //cloud
  drawClouds();
  //mountain
  drawMountains();
  // tree
  DrawTrees();
  // for rendering flag pole
  renderfalgpole();
  //creating platforms
  platforms.forEach((element) => {
    element.draw();
  });
  //for enemies
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    let iscontact = enemies[i].checkcontact(gameChar_x, gameChar_y);
    if (iscontact) {
      if (lives > 0) {
        lives--;
        startgame();
        break;
      }
    }
  }

  //loop for collectables array
  collectables.forEach((collectable) => {
    if (!collectable.isFound) {
      // draw the collectible
      drawCollectables(collectable);
      //check collectable found
      checkCollectable(collectable);
    }
  });

  canyons.forEach((canyon) => {
    // draw canyon
    drawCanyon(canyon);
    //check canyon
    checkCanyon(canyon);
  });

  //check for flag pole is reached
  if (flagpole.isreached == false) {
    checkflagpole();
  }

  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    fill(250, 234, 177);
    ellipse(gameChar_x - 5, gameChar_y - 52, 25, 25);
    stroke(0);
    line(gameChar_x + 3, gameChar_y - 38, gameChar_x + 10, gameChar_y - 25);
    line(gameChar_x - 13, gameChar_y - 38, gameChar_x - 20, gameChar_y - 25);
    fill(197, 137, 64);
    rect(gameChar_x - 12, gameChar_y - 38, 15, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 10, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 12, gameChar_y - 2, 3, 1);
    rect(gameChar_x, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 2, gameChar_y - 2, 3, 1);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    fill(250, 234, 177);
    ellipse(gameChar_x - 5, gameChar_y - 52, 25, 25);
    stroke(0);
    line(gameChar_x + 3, gameChar_y - 38, gameChar_x + 10, gameChar_y - 25);
    line(gameChar_x - 13, gameChar_y - 38, gameChar_x - 20, gameChar_y - 25);
    fill(197, 137, 64);
    rect(gameChar_x - 12, gameChar_y - 38, 15, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 10, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 8, gameChar_y - 2, 4, 1);
    rect(gameChar_x, gameChar_y - 12, 3, 8);
    rect(gameChar_x + 2, gameChar_y - 2, 4, 1);
  } else if (isLeft) {
    // add your walking left code
    fill(250, 234, 177);
    ellipse(gameChar_x - 5, gameChar_y - 52, 25, 25);
    stroke(0);
    line(gameChar_x + 3, gameChar_y - 38, gameChar_x + 10, gameChar_y - 25);
    line(gameChar_x - 13, gameChar_y - 38, gameChar_x - 20, gameChar_y - 25);
    fill(197, 137, 64);
    rect(gameChar_x - 12, gameChar_y - 38, 15, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 10, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 12, gameChar_y - 2, 3, 1);
    rect(gameChar_x, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 2, gameChar_y - 2, 3, 1);
  } else if (isRight) {
    // add your walking right code
    fill(250, 234, 177);
    ellipse(gameChar_x - 5, gameChar_y - 52, 25, 25);
    stroke(0);
    line(gameChar_x + 3, gameChar_y - 38, gameChar_x + 10, gameChar_y - 25);
    line(gameChar_x - 13, gameChar_y - 38, gameChar_x - 20, gameChar_y - 25);
    fill(197, 137, 64);
    rect(gameChar_x - 12, gameChar_y - 38, 15, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 10, gameChar_y - 12, 3, 8);
    rect(gameChar_x - 8, gameChar_y - 2, 4, 1);
    rect(gameChar_x, gameChar_y - 12, 3, 8);
    rect(gameChar_x + 2, gameChar_y - 2, 4, 1);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    fill(250, 234, 177);
    ellipse(gameChar_x - 5, gameChar_y - 60, 25, 25);
    stroke(0);
    line(gameChar_x + 3, gameChar_y - 40, gameChar_x + 10, gameChar_y - 55);
    line(gameChar_x - 13, gameChar_y - 40, gameChar_x - 20, gameChar_y - 55);
    fill(197, 137, 64);
    rect(gameChar_x - 12, gameChar_y - 48, 15, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 12, gameChar_y - 23, 5, 10);
    rect(gameChar_x - 2, gameChar_y - 23, 5, 10);
  
  } else {
    // add your standing front facing code
    noStroke(0);
    fill(250, 234, 177);
    ellipse(gameChar_x - 10, gameChar_y - 47, 25, 25);
    fill(197, 137, 64);
    rect(gameChar_x - 19, gameChar_y - 34, 18, 25);
    fill(229, 186, 115);
    rect(gameChar_x - 16, gameChar_y - 9, 5, 10);
    rect(gameChar_x - 7, gameChar_y - 9, 5, 10);
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here
  if (isLeft == true) {
    gameChar_x -= 4;
  }
  if (isRight == true) {
    gameChar_x += 4;
  }

  if (gameChar_y < floorPos_y) {
    let iscontact = false;
	//if the player interacted with the platform
    for (let i = 0; i < platforms.length; i++) {
      if (platforms[i].checkcontact(gameChar_x, gameChar_y) == true) {
        iscontact = true;
        isFalling = false;
        break;
      }
    }
    if (iscontact == false) {
      isFalling = true;
      gameChar_y += 2;
     
    }
  } else {
    isFalling = false;
  }
  if (isPlummeting == true) {
    if (gameChar_y <= height) {
      gameChar_y += 10;
    }
    isLeft = false;
    isRight = false;
    setTimeout(checkplayerdie, 300)
  }

}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);

  if (isPlummeting == false) {
    if (keyCode == 65) {
      console.log("a key");
      isLeft = true;
      mysound.play();
    }
    if (keyCode == 68) {
      console.log("d key");
      isRight = true;
      mysound.play();
    }
    if (keyCode == 87 && isFalling == false) {
      console.log("w key");
      gameChar_y -= 80;
      mysound.play();
    }
  }
}
function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);

  if (keyCode == 65) {
    console.log("a key");
    isLeft = false;
  }
  if (keyCode == 68) {
    console.log("d key");
    isRight = false;
  }
}
//function to draw clouds
function drawClouds() {
  for (var n = 0; n < cloudx.length; n++) {
    fill(250);
    noStroke();
    ellipse(cloudx[n] + 40, cloud.y, cloud.size);
    ellipse(cloudx[n] + 80, cloud.y, cloud.size);
    ellipse(cloudx[n] + 60, cloud.y, cloud.size + 10);
  }
}
//fuction to draw mountains
function drawMountains() {
  for (var m = 0; m < mountainx.length; m++) {
    fill(255, 102, 102);
    triangle(
      mountainx[m],
      mountain.y - 200,
      mountainx[m] - 100,
      mountain.y + 32,
      mountainx[m] + 100,
      mountain.y + 32
    );
    fill(0);
    triangle(
      mountainx[m],
      mountain.y,
      mountainx[m] - 100,
      mountain.y + 32,
      mountainx[m] + 100,
      mountain.y + 32
    );
    console.log(mountain.y);
  }
}
//function to draw trees
function DrawTrees() {
  for (var o = 0; o < treex.length; o++) {
    fill(107, 89, 31);
    rect(treex[o] - 170, treePos_y + 50, 40, 105);
    fill(0, 155, 0);
    ellipse(treex[o] + 150, treePos_y, 70, 50);
    ellipse(treex[o] + 165, treePos_y + 15, 70, 50);
    ellipse(treex[o] + 175, treePos_y + 30, 70, 50);
    ellipse(treex[o] + 185, treePos_y + 45, 70, 50);
    ellipse(treex[o] - 175, treePos_y + 15, 70, 50);
    ellipse(treex[o] - 175, treePos_y + 30, 80, 50);
    ellipse(treex[o] - 195, treePos_y + 45, 80, 50);
  }
}
//function to draw collectables
function drawCollectables(t_collectable) {
  if (t_collectable.isFound == false) {
    fill(212, 175, 55);
    stroke(255, 255, 255);
    strokeWeight(3);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size,
      t_collectable.size
    );
    textSize(t_collectable.size - 10);
    text("$", t_collectable.x_pos - 8, t_collectable.y_pos + 10);
    noStroke();
    strokeWeight(1);
  }
}
//function to drawcanyon
function drawCanyon(t_canyon) {
  fill(62, 62, 63);
  rect(t_canyon.x_pos, t_canyon.width, 110, 145);
  stroke(355);
  line(t_canyon.x_pos + 55, t_canyon.width + 18, t_canyon.x_pos + 55, 475);
  line(t_canyon.x_pos + 55, t_canyon.width + 60, t_canyon.x_pos + 55, 515);
  line(t_canyon.x_pos + 55, t_canyon.width + 100, t_canyon.x_pos + 55, 555);
}
//function to check collectables
function checkCollectable(t_collectable) {
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <
    t_collectable.size
  ) {
    if (t_collectable.isFound == false) {
      t_collectable.isFound = true;
      console.log("collectable found");
      game_score++;
    }
  }
}
//function to check canyon
function checkCanyon(t_canyon) {
  if (
    gameChar_x < t_canyon.x_pos + 110 &&
    gameChar_x > t_canyon.x_pos &&
    gameChar_y >= 432
  ) {
    isPlummeting = true;
  }
}
//rendering the finish flag
function renderfalgpole() {
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  fill(255, 0, 255);
  noStroke();
  if (flagpole.isreached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
}
//check if the character approched the flag
function checkflagpole() {
  if (abs(gameChar_x - flagpole.x_pos) < 15) {
    flagpole.isreached = true;
  }
}
//check if player lives are left dec them
function checkplayerdie() {
  if (isPlummeting==true) {
    if (lives > 0) {
      lives -= 1;
    }
    if(lives>0){
      startgame();
    }
  }
}
//creating enemies
function enemie(x, y, range) {
  var object = {
    x: x,
    y: y,
    range: range,
    currentx: x,
    inc: 1,
    update: function () {
      this.currentx += this.inc;
      if (this.currentx >= this.x + this.range) {
        this.inc = -1;
      } else if (this.currentx < this.x) {
        this.inc = 1;
      }
    },
    draw: function () {
      this.update();
      fill(255, 0, 0);
      rect(this.currentx, this.y-20, 40, 20);
      // Draw the head
      fill(200,100,20)
      ellipse(this.currentx+20, this.y-25, 30, 15, 0, 0, 2 * 3.14);
      // Draw the legs
      fill(100,100,70)
      rect(this.currentx, this.y-5, 10, 20);
      rect(this.currentx+30, this.y-5, 10, 20);
    },
    checkcontact: function (gc_x, gc_y) {
      let d = dist(gc_x, gc_y, this.currentx+30, this.y);
      if (d < 20) {
        return true;
      }
      return false;
    },
  };
  return object;
}
function createplatforms(x, y, length) {
  var object = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(205, 210, 105);
       ellipse(this.x+35, this.y, this.length, 20);

    },
    checkcontact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        let d = this.y - gc_y;
        if (d >= 0 && d < 10) {
          return true;
        }
      }
      return false;
    },
  };
  return object;
}