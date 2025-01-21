// variables
let aspectRatio, fieldOfView, fieldOfViewAngle, zNear, zFar;
let projectionMatrix = new mat4x4();

let Display = {
	width: 256,
	height: 240,
	fontWidth: 4,
	fontHeight: 4,
	fontSize: 4,
	appName: "Graphics Engine 3D",
};

let cube = [
	// SOUTH
	[0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0],
	[0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],

	// EAST
	[1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0],
	[1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0],

	// NORTH
	[1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0],
	[1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0],

	// WEST
	[0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0],
	[0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0],

	// TOP
	[0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0],
	[0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0],

	// BOTTOM
	[1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0],
	[1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0],
];

let meshObject = new mesh3D();

for (let i = 0; i < cube.length; i++) {
	meshObject.add(
		new triangle3D(
			new vec3D(cube[i][0], cube[i][1], cube[i][2]),
			new vec3D(cube[i][3], cube[i][4], cube[i][5]),
			new vec3D(cube[i][6], cube[i][7], cube[i][8])
		)
	);
}
// console.log(meshObject.getTriangles());

function setup() {
	// createCanvas(
	// 	Display.width * Display.fontSize,
	// 	Display.height * Display.fontSize
	// );
	createCanvas(window.innerWidth, window.innerHeight);
	aspectRatio = window.innerWidth / window.innerHeight;
	fieldOfViewAngle = HALF_PI;
	fieldOfView = 1 / tan(fieldOfViewAngle * 0.5);
	zNear = 1.0;
	zFar = 1001.0;
	zQuotient = zFar / (zFar - zNear);

	projectionMatrix.matrix[0][0] = aspectRatio * fieldOfView;
	projectionMatrix.matrix[1][1] = fieldOfView;
	projectionMatrix.matrix[2][2] = zQuotient;
	projectionMatrix.matrix[3][2] = -zNear * zQuotient;
	projectionMatrix.matrix[2][3] = 1;
	projectionMatrix.matrix[3][3] = 0;
}

function draw() {
	background(0);

	// draw triangles
	for (let triangle of meshObject.triangles) {
		let projectedTriangle = new triangle3D();
		for (let i in projectedTriangle.vertex) {
			projectedTriangle.vertex[i] = MatrixMultiplicationVector(
				triangle.vertex[i],
				projectedTriangle.vertex[i],
				projectionMatrix
			);
		}
	}
}

// resize window everytime screen changes
function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
	aspectRatio = window.innerWidth / window.innerHeight;
}
