// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/JTlijNWh2/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "", prevLabel = "";
let fillColor;
let img; 
let glass;
let white;
let cup;
let steel;
let wood;
let bowl;
let counter = 0;


let offset = 65;       
let displayState = 0;  
let song;
let currentImage;
let displayImage = false;



function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  img = loadImage('banana.jpg'); 
  
  glass = loadImage('glass.png');
  cup = loadImage('cup.png');
  white = loadImage('white.png');
  steel = loadImage('steel.png');
  wood = loadImage('wood.png');
  bowl = loadImage('bowl.png')

  song = loadSound('beep.mp3');
}

function setup() {
  createCanvas(1000, 700);
  video = createCapture(VIDEO);
  video.size(220, 160);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  fillColor = color(0, 0, 0);
  
  // Set the click event for the check-out button
  let checkOutButton = document.getElementById("check-out-button");
  checkOutButton.onclick = function() {
      alert("Your total price is: $" + counter);
  };
}

function draw() {
  background(img);
  fill(fillColor);
  ellipse(60, 650, 50, 50);
  
  if(displayImage) {
      image(currentImage, 395, 140, 500, 500);
  }

}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  if (label === "with" && prevLabel !== "with") {
    fillColor = color(255, 0, 0);
    cycleDisplay();
    song.play();
  } else if (label !== "with") {
    fillColor = color(0, 0, 0);
  }
  prevLabel = label;
  classifyVideo();
}

function cycleDisplay() {
    switch (displayState) {
        case 0:
            currentImage = cup;
            displayImage = true;
            displayState = 1;
            addItem("$25 Wooden Banana Coffee Set x1", 25); // Adds 1
            break;
        case 1:
            currentImage = glass;
            displayImage = true;
            displayState = 2;
            addItem("$150 Red Glass Banana Stand x1", 150); // Adds 2
            break;
        case 2:
            currentImage = white;
            displayImage = true;
            displayState = 3;
            addItem("$200 Baroque Banana Ornament x1", 200); // Adds 3
            break;
        case 3:
            currentImage = steel;
            displayImage = true;
            displayState = 4;
            addItem("$16 Stainless Steel Banana Blade x1", 16); // Adds 4
            break;
        case 4:
            currentImage = wood;
            displayImage = true;
            displayState = 5;
            addItem("$45 Wooden Banana Handle x1", 45); // Adds 5
            break;
        case 5:
            currentImage = bowl;
            displayImage = true;
            displayState = 0;
            addItem("$8 Blue Banana Pet Bowl x1", 8); // Adds 6
            break;
    }
}

function addItem(itemName, increment) {
    // Create a new paragraph element
    let newParagraph = document.createElement("p");

    // Add class "scanned-item" to the new paragraph
    newParagraph.className = "scanned-item";

    // Set the text of the new paragraph to the itemName argument
    newParagraph.textContent = itemName;

    // Find the div with class "scanned-container"
    let container = document.querySelector(".scanned-container");

    // Append the new paragraph to the container
    container.appendChild(newParagraph);
  
    // Scroll the container to the bottom
    container.scrollTop = container.scrollHeight;

    // Update the counter
    counter += increment;
    updateCycleCount();
}

function updateCycleCount() {
    document.getElementById("counter").innerText = "Total: $ " + counter;
}

