class vec3D {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class triangle3D {
	constructor(a = new vec3D(), b = new vec3D(), c = new vec3D()) {
		this.vertex = [a, b, c];
	}
	draw = (
		colour = "rgb(0, 0, 0)",
		strokeWidth = 1,
		isFill = true,
		strokeColour = "rgb(255, 255, 255)"
	) => {
		noFill();
		if (isFill) fill(colour);
		stroke(strokeColour);
		strokeWeight(strokeWidth);
		beginShape();
		vertex(this.vertex[0].x, this.vertex[0].y);
		vertex(this.vertex[1].x, this.vertex[1].y);
		vertex(this.vertex[2].x, this.vertex[2].y);
		endShape(CLOSE);
	};
}

class mesh3D {
	constructor() {
		this.triangles = [];
	}

	add = (triangle) => {
		try {
			if (!(triangle instanceof triangle3D))
				throw "Error: expected instance of triangle3D.";
			this.triangles.push(triangle);
		} catch (err) {
			console.log(err);
		}
	};
	getTriangles = () => {
		return this.triangles;
	};
	draw = () => {
		for (let triangle of this.triangles) triangle.draw();
	};
}

class mat4x4 {
	constructor() {
		this.matrix = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	}
}
