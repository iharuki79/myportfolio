var canvas;

function windowResized() {
    resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    background(255);
}

function setup(){
    canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    canvasSetup();
    setInterval(()=>{
        background(255);
    }, 16000);
}

function canvasSetup(){
    background(255);
    noStroke();
}

function draw(){
    frameRate(10);
    let rand = parseInt(random(245, 255));
    if(rand%6 == 0)      fill(rand, 255-rand, 255-rand, 75);
    else if(rand%6 == 1) fill(255-rand, rand, 255-rand, 75);
    else if(rand%6 == 2) fill(255-rand, 255-rand, rand, 75);
    else if(rand%6 == 3) fill(rand, rand, 255-rand, 75);
    else if(rand%6 == 4) fill(rand, 255-rand, rand, 75);
    else if(rand%6 == 5) fill(255-rand, rand, rand, 75);
    rect(random(-width, width), random(-height, height), rand - 170, rand - 170);
}
