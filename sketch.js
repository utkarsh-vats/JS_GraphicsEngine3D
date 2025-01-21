const Display = {
	width: 256,
	height: 240,
	fontWidth: 4,
	fontHeight: 4,
	fontSize: 4,
	appName: "Graphics Engine 3D",
};

function setup() {
	// createCanvas(
	// 	Display.width * Display.fontSize,
	// 	Display.height * Display.fontSize
	// );
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(0);
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}
