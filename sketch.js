let mic, recorder, soundFile;
let state = 0;
var number;
let keys = [36];
let audios = [36];
let whiteKeyWidth = 34;
let blackKeyWidth = 20;
let demoButton;
let demoAudio;

//recording button 
let recordXPos = 500;
let recordYPos = 370;
let redRecordSize = 40;
let recordingText = "Press to Record";
let blackKeyPressed = false;

function setup() {

  width = 714;
  height = 500;
  
  createCanvas(width, height);
  colorMode(HSB);
  background(190,20,80);
  createKeys();

  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  
  demoButton = loadImage('demo button.png');
  demoAudio = loadSound('merry christmas whistling.wav');
  demoAudio.playMode('untilDone');
}

function createKeys()
{
  //should be 21 white keys and 15 black keys 
  //black keys are either 1 white key or 2 white keys away from each other
  //low keys 
  keys[0] = new key('c low.mp3', whiteKeyWidth * 0, 81, false, 'Q');
  keys[1] = new key('c sharp low.mp3', 24, 50, true, '2');
  keys[2] = new key('d low.mp3', whiteKeyWidth * 1, 87, false, 'W');
  keys[3] = new key('d sharp low.mp3', 24 + (whiteKeyWidth * 1), 51, true, '3');
  keys[4] = new key('e low.mp3', whiteKeyWidth * 2, 69, false, 'E');
  keys[5] = new key('f low.mp3', whiteKeyWidth * 3, 82, false, 'R');
  keys[6] = new key('f sharp low.mp3', 24 + (whiteKeyWidth * 3), 53, true,'5');
  keys[7] = new key('g low.mp3', whiteKeyWidth * 4, 84, false,'T');
  keys[8] = new key('g sharp low.mp3', 24 + (whiteKeyWidth * 4), 54, true,'6');
  keys[9] = new key('a low.mp3', whiteKeyWidth * 5, 89, false,'Y');
  keys[10] = new key('a sharp low.mp3', 24 + (whiteKeyWidth * 5), 55, true,'7');
  keys[11] = new key('b low.mp3', whiteKeyWidth * 6, 85, false,'U');
  
  
  //middle keys 
  keys[12] = new key('c.mp3', whiteKeyWidth * 7, 73, false,'I');
  keys[13] = new key('c sharp.mp3', 24 + (whiteKeyWidth * 7), 57, true,'9');
  keys[14] = new key('d.mp3', whiteKeyWidth * 8, 79, false,'O');
  keys[15] = new key('d sharp.mp3', 24 + (whiteKeyWidth * 8), 48, true,'0');
  keys[16] = new key('e.mp3', whiteKeyWidth * 9, 80, false,'P');
  keys[17] = new key('f.mp3', whiteKeyWidth * 10, 90, false,'Z');
  keys[18] = new key('f sharp.mp3', 24 + (whiteKeyWidth * 10), 83, true,'S');
  keys[19] = new key('g.mp3', whiteKeyWidth * 11, 88, false,'X');
  keys[20] = new key('g sharp.mp3', 24 + (whiteKeyWidth * 11), 68, true,'D');
  keys[21] = new key('a.mp3', whiteKeyWidth * 12, 67, false,'C');
  keys[22] = new key('a sharp.mp3', 24 + (whiteKeyWidth * 12), 70, true,'F');
  keys[23] = new key('b.mp3', whiteKeyWidth * 13, 86, false,'V');
  
  //high keys 
  keys[24] = new key('c high.mp3', whiteKeyWidth * 14, 66, false,'B');
  keys[25] = new key('c sharp high.mp3', 24 + (whiteKeyWidth * 14), 72, true,'H');
  keys[26] = new key('d high.mp3', whiteKeyWidth * 15, 78, false,'N');
  keys[27] = new key('d sharp high.mp3', 24 + (whiteKeyWidth * 15), 74, true,'J');
  keys[28] = new key('e high.mp3', whiteKeyWidth * 16, 77, false,'M');
  keys[29] = new key('f high.mp3', whiteKeyWidth * 17, 188, false,',');
  keys[30] = new key('f sharp high.mp3', 24 + (whiteKeyWidth * 17), 76, true,'L');
  keys[31] = new key('g high.mp3', whiteKeyWidth * 18, 190, false,'.');
  keys[32] = new key('g sharp high.mp3', 24 + (whiteKeyWidth * 18), 186, true,';');
  keys[33] = new key('a high.mp3', whiteKeyWidth * 19, 191, false,'/');
  keys[34] = new key('a sharp high.mp3', 24 + (whiteKeyWidth * 19), 189, true,'-');
  keys[35] = new key('b high.mp3', whiteKeyWidth * 20, 187, false, '=');
}

function draw() 
{
    textSize(35);
    fill(0);
    text('Whistle Keyboard', 210, 85);  
  
    //Draw all the white keys first, then the black keys 
    strokeWeight(2.3);
    //console.log(keys.length);
    for(var x = 0; x < keys.length; x++)
      {
        if(keys[x].sharp == false)
          {
            keys[x].drawKey();
          }
      }
    for(var x = 0; x < keys.length; x++)
      {
        if(keys[x].sharp == true)
          {
            keys[x].drawKey();
          }
      }
    strokeWeight(0);
    fill(255);
    ellipse(recordXPos, recordYPos, 46);
    fill('red');
    ellipse(recordXPos, recordYPos, redRecordSize);
    fill(255);
    rect(400, 400, 200, 40);
    textSize(23);
    fill(0);
    text(recordingText, 415, 430); 
  
    if(state === 2)
      {
        fill('green');
        rect(245, 450, 80, 40);
        fill(255);
        text('yes', 265,475)
        fill('red');
        rect(365, 450, 80, 40);
        fill(255);
        text('no', 390,475);
      }
    else
      {
        fill(190,20,80);
        rect(245, 450, 200, 40);
      }
  
    image(demoButton, 180, 346, 45, 45);
    fill(255);
    rect(105, 400, 200, 40);
    fill(0);
    text('Click to play demo', 109, 429);

}


function keyPressed() {
  for(var x = 0; x < keys.length; x++)
    {
      keys[x].playKey();
    }
}

function mousePressed() {
  for(var x = 0; x < keys.length; x++)
    {
      keys[x].playKey();
    }
  
  let correctDemoPosition = mouseX >= 180 && mouseX <= 180 + 45 && mouseY >= 346 && mouseY <= 346 + 45;
  if(correctDemoPosition)
    {
      demoAudio.play();
    }
  
  getAudioContext().resume();
  let correctButtonPosition = mouseX >= recordXPos - 20 && mouseX <= recordXPos + 20 && mouseY >= recordYPos - 20 && mouseY <= recordYPos + 20;
  
  // make sure user enabled the mic
  if (state === 0 && correctButtonPosition) 
  {
    // record to our p5.SoundFile
    recorder.record(soundFile);
    redRecordSize = 30;
    recordingText = "Recording!";
    state++;
  }
  else if (state === 1 && correctButtonPosition) {
    redRecordSize = 40;

    // stop recorder and
    // send result to soundFile
    recorder.stop();
    recordingText = "Done: Save?";
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    if(mouseX >= 245 && mouseX <= 245 + 80 && mouseY >= 450 &&       mouseY <= 450 + 40 && mouseIsPressed)
      {
        save(soundFile, 'mySound.wav');
      }
    state = 0;
    recordingText = "Press to Record";
  }
  
}

class key 
{
  constructor(fileName, xPos, code, sharp, letter)
  {
    this.fileName = fileName;
    this.xPos = xPos;
    this.code = code;
    this.sharp = sharp;
    this.letter = letter;
    this.sound = loadSound(fileName);
    if(sharp === true)
      {
        this.color = 0;
      }
    else
      {
        this.color = 255;
      }
  }

  drawKey()
  {
    if(this.sharp == false)
      {
        fill(this.color);
        rect(this.xPos, 150, 34, 175);
        textSize(20);
        fill(0);
        text(this.letter, this.xPos + 8, 300);
      }
    else if(this.sharp == true)
      {
        fill(this.color);
        rect(this.xPos, 150, 20, 110);
        fill(255);
        text(this.letter, this.xPos + 4, 250);
      }
    
  }
  
  playKey()
  {
      if (keyCode === this.code && keyIsPressed) 
      {
        if(this.sharp === false)
          {
            this.color = 85;
            this.sound.play();
            setTimeout(turnWhite, 220, this);
          }
        else if(this.sharp === true)
          {
            this.color = 40;
            this.sound.play();
            setTimeout(turnBlack, 220, this);
          }
      }   
    
      else if(mouseIsPressed && this.sharp === true && mouseY >= 150 && mouseY <= 260 && mouseX >= this.xPos && mouseX <= this.xPos + 20)
      {
        this.color = 40;
        blackKeyPressed = true;
        this.sound.play();
        setTimeout(turnBlack, 220, this);
      }
      
     else if(mouseIsPressed && this.sharp === false && mouseY >= 260 && mouseY <= 325 && mouseX >= this.xPos && mouseX <= this.xPos + 34 && blackKeyPressed === false)
      {
        this.color = 85;
        this.sound.play();
        setTimeout(turnWhite, 220, this);
      }
    
    blackKeyPressed = false;
  }
  
}

function turnWhite(key)
{
  key.color = 255;
}

function turnBlack(key)
{
  key.color = 0;
}
