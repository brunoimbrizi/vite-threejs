// uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
	vec2 uv = vUv;
	vec4 color = vec4(1.0);

	color.rgb = uColor;
	// color = texture2D(uTexture, uv);

	gl_FragColor = color;
}