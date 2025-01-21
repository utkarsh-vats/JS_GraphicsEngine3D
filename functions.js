let MatrixMultiplicationVector = (i, o = new vec3D(), matrix) => {
	o.x =
		i.x * matrix.matrix[0][0] +
		i.y * matrix.matrix[0][1] +
		i.z * matrix.matrix[0][2] +
		matrix.matrix[0][3];
	o.y =
		i.x * matrix.matrix[1][0] +
		i.y * matrix.matrix[1][1] +
		i.z * matrix.matrix[1][2] +
		matrix.matrix[1][3];
	o.z =
		i.x * matrix.matrix[2][0] +
		i.y * matrix.matrix[2][1] +
		i.z * matrix.matrix[2][2] +
		matrix.matrix[2][3];
	let w =
		i.x * matrix.matrix[3][0] +
		i.y * matrix.matrix[3][1] +
		i.z * matrix.matrix[3][2] +
		matrix.matrix[3][3];
	// o.x =
	// 	i.x * matrix.matrix[0][0] +
	// 	i.y * matrix.matrix[1][0] +
	// 	i.z * matrix.matrix[2][0] +
	// 	matrix.matrix[3][0];
	// o.y =
	// 	i.x * matrix.matrix[0][1] +
	// 	i.y * matrix.matrix[1][1] +
	// 	i.z * matrix.matrix[2][1] +
	// 	matrix.matrix[3][1];
	// o.z =
	// 	i.x * matrix.matrix[0][2] +
	// 	i.y * matrix.matrix[1][2] +
	// 	i.z * matrix.matrix[2][2] +
	// 	matrix.matrix[3][2];
	// let w =
	// 	i.x * matrix.matrix[0][3] +
	// 	i.y * matrix.matrix[1][3] +
	// 	i.z * matrix.matrix[2][3] +
	// 	matrix.matrix[3][3];

	if (w != 0) {
		o.x /= w;
		o.y /= w;
		o.z /= w;
	}
	return o;
};
