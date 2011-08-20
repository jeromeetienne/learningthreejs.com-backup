// define namespace
var THREEx		= THREEx || {};
THREEx.ShaderLib	= THREEx.ShaderLib	|| {};
THREEx.UniformsLib	= THREEx.UniformsLib	|| {};

THREEx.UniformsLib['plasma']	= {
	time	: { type : "f", value:  0.0 },
	c0	: { type : "f", value:  5.0 },
	c1	: { type : "f", value:  3.0 },
	c2	: { type : "f", value: 11.0 },
	c3	: { type : "f", value:  7.0 },
	c4	: { type : "f", value:  9.0 },
	c5	: { type : "f", value:  3.0 }	
};

THREEx.ShaderLib['plasma']	= {
	vertexShader:	[
		"#ifdef GL_ES",
			"precision highp float;",
		"#endif",
		"varying vec2 vUv;",
		"void main(){",
			"vUv	= uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
		"}"
	].join( "\n" ),
	fragmentShader: [
		"#ifdef GL_ES",
			"precision highp float;",
		"#endif",
		"varying vec2 vUv;",
		"uniform float time;",
		"uniform float c0, c1, c2, c3, c4, c5;",
		"void main(){",
			"vec2 p		= -1.0 + 2.0 * vUv;",
			"float cossin1	= cos(p.x*c0+sin(c0*time/c3)) * sin(p.y*c3*cos(time)) + sin(time);",
			"float cossin2	= cos(p.y*c1+cos(c1*time/c4)) * sin(p.x*c4*sin(time)) - cos(time);",
			"float cossin3	= cos(p.x*c2+sin(c2*time/c5)) + sin(p.y*c5+cos(time)) + cos(time);",
			"gl_FragColor	= vec4(cossin1*sin(p.x), cossin2*sin(p.y), cossin3*sin(p.x), 1.0);",
		"}"		
	].join( "\n" )
};