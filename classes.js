class vec3D {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class triangle3D {
	constructor(a = new vec3D(), b = new vec3D(), c = new vec3D()) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}

class mesh3D {
	constructor() {
		this.triangles = new Array();
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
}
