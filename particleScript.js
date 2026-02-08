/*
Allison R.
Week of December 8, 2025
particleScript.js
*/



/*** initialize global variables ***/
var userInput = "";	// holds user input
var arrParticles = [];	// particle array
var spawnParticles = false; // flag to track if particles have been created or not



//*** STRUCTURE ***//

/*** this function sets up the canvas and other elements on the page, creating structure ***/
function setup() {
	var canvas = createCanvas(1200, 620);	// make the canvas
	canvas.id("mainCanvas");	// set the canvas id
	canvas.parent("canvasWrapper");	// attach the canvas to the parent <div> element 
	
	submit();	// call the submit function
	reset();	// call the reset function 	
}



//*** BUTTON LOGIC ***//

/*** this function handles the submit button logic ***/
function submit() {
	// attach an event listener to the submit button so that user input will be displayed
	document.getElementById("btnSubmit").addEventListener("click", () => {
		var name = document.getElementById("nameinput").value.toLowerCase();	// store value of input and force to lower case
		
		/* form validation */
		if (name !== "") {
			userInput = "hello " + name;	// concatenate the user's input 
			
			/* create particles upon submit */
			var rand = Math.floor(Math.random() * (150 - 50) + 50);	// get random integer between 50 and 150
			arrParticles = [];	// reset particle array 
		
			/* create particle object */
			var i = 0;
			while(i<rand) {
				var particle = {
					x: random(width),	// based on canvas width
					y: random(height),	// based on canvas height
					vx: random(-2, 2),	// horizontal speed (velocity)
					vy: random(-2,2),	// vertical speed (velocity)
					size: random(2, 20),	// radius
					color: `hsl(${Math.floor(random(360))}, 80%, 50%)` 	// template literal to generate a random color with hue, saturation, and lightness
				};
				arrParticles.push(particle);	// add particle object to array
				i++
			}
			
			spawnParticles = true; 	// set flag to true		
		}
		else {
			alert("please enter your name, or something..."); 	// alert the user to fill in field
		}	
	});	
}


/*** this function handles the reset button logic ***/
function reset() {
	document.getElementById("btnReset").addEventListener("click", () => {
		userInput = "";		// clear user input variable
		document.getElementById("nameinput").value = "";	// clear input field
		document.getElementById("blue").checked = true;		// reset radio button to default
		arrParticles = [];	// clear the particle array
		
	});
}



//*** DRAWING ON THE CANVAS ***//

/*** this function draws onto the canvas ***/
function draw() {
	clear();	// clear the canvas
	
	cursor(CROSS);	// change the cursor's appearance over the canvas
	
	getRadioSelection();	// call background color function

	/* manupulate the text appearance on the canvas */
	textSize(42);	// change text size
	textFont("courier new");	// change font family, using a built-in 
	textStyle(BOLD);	// change text weight
	textAlign(CENTER, CENTER);	// sets horizontal and vertical alignment
	text(userInput, width/2-500, height/2, 1000);	// width and height are automatically set to the canvas width and height, trial/error offset for text wrapping (wraps within given pixels)
	
	/* loop through the particles */
	if (spawnParticles === true) {
		for (var p of arrParticles) {
			p.x += p.vx;	// update the horizontal position
			p.y += p.vy;	// update the verticle position
		
			fill(p.color);
			noStroke();
			ellipse(p.x, p.y, p.size);
		}	
	}
}


//*** HELPER FUNCTIONS AND OTHER LOGIC ***//

// this function uses a switch statment to change the canvas background
function getRadioSelection() {

	// initialize local variables
	var arrColor =['#165a64', '#ffb331', '#f66b3d', '#a11559', '#3f6948']; 
	var selectedRadio = document.querySelector('input[name="color"]:checked').value;

	switch (selectedRadio) {
		case "yellow":
			background(arrColor[1]);	// change background color
			fill("#003e6e");	// change font color
			break;
		case "orange":
			background(arrColor[2]);
			fill("#f0efe6");
			break;
		case "pink":
			background(arrColor[3]);
			fill("#f0efe6");
			break;
		case "green":
			background(arrColor[4]);
			fill("#f0efe6");
			break;
		default:
			background(arrColor[0]);
			fill("#f0efe6");
			break;
	}	
}




