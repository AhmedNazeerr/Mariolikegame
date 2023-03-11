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

export {keyPressed,keyReleased}