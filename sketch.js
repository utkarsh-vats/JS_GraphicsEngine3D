// variables
let aspectRatio, fieldOfView, fieldOfViewAngle, zNear, zFar;
let projectionMatrix = new mat4x4();
let identityMatrix4x4 = new mat4x4();
let idMat4x4 = [
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 3],
	[0, 0, 0, 1],
];
identityMatrix4x4.matrix = idMat4x4;
let matRotX = new mat4x4();
let matRotZ = new mat4x4();
let zrot, xrot;

let theta;

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
	aspectRatio = window.innerHeight / window.innerWidth;
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

	// frameRate(1 / 10);
}
// console.log(identityMatrix4x4);

function draw() {
	background(0);

	theta += 1 * deltaTime;

	zrot = [
		[cos(theta), sin(theta), 0, 0],
		[-sin(theta), cos(theta), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
	];
	xrot = [
		[1, 0, 0, 0],
		[0, cos(theta * 0.5), sin(theta * 0.5), 0],
		[0, -sin(theta * 0.5), cos(theta * 0.5), 0],
		[0, 0, 0, 1],
	];

	matRotX.matrix = xrot;
	matRotZ.matrix = zrot;

	// draw triangles
	for (let triangle of meshObject.triangles) {
		let projectedTriangle = new triangle3D();
		let translatedTriangle = new triangle3D();
		let triangleRotatedZ = new triangle3D();
		let triangleRotatedZX = new triangle3D();
		// translatedTriangle = triangle;
		for (let i in projectedTriangle.vertex) {
			triangleRotatedZ.vertex[i] = MatrixMultiplicationVector(
				triangle.vertex[i],
				triangleRotatedZ.vertex[i],
				matRotZ
			);
			triangleRotatedZX.vertex[i] = MatrixMultiplicationVector(
				triangleRotatedZ.vertex[i],
				triangleRotatedZX.vertex[i],
				matRotX
			);

			translatedTriangle.vertex[i] = MatrixMultiplicationVector(
				triangle.vertex[i],
				translatedTriangle.vertex[i],
				identityMatrix4x4
			);
			console.log(i, triangle.vertex[i], triangleRotatedZ.vertex[i]);

			projectedTriangle.vertex[i] = MatrixMultiplicationVector(
				translatedTriangle.vertex[i],
				projectedTriangle.vertex[i],
				projectionMatrix
			);
			projectedTriangle.vertex[i].x += 1;
			projectedTriangle.vertex[i].y += 1;

			projectedTriangle.vertex[i].x *= 0.5 * window.innerWidth;
			projectedTriangle.vertex[i].y *= 0.5 * window.innerHeight;
		}
		projectedTriangle.draw("red", 1, true, "white");
	}
}

// resize window everytime screen changes
function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
	aspectRatio = window.innerHeight / window.innerWidth;
	projectionMatrix.matrix[0][0] = aspectRatio * fieldOfView;
}
