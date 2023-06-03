import '../scss/style.scss';

import CanvasView from './canvas/CanvasView';
import GUIView from './gui/GUIView';

export default class App {

	constructor() {
		this.el = document.querySelector('#app');
	}

	init() {
		this.initCanvas();
		this.initGUI();
		this.addListeners();
		this.animate();
		this.resize();
	}

	initCanvas() {
		this.canvas = new CanvasView(this);
		this.el.appendChild(this.canvas.canvas);
	}

	initGUI() {
		this.gui = new GUIView(this);
	}

	addListeners() {
		this.handlerAnimate = this.animate.bind(this);

		window.addEventListener('resize', this.resize.bind(this));
		window.addEventListener('keyup', this.keyup.bind(this));
	}

	animate() {
		this.update();
		this.draw();

		this.raf = requestAnimationFrame(this.handlerAnimate);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		if (this.gui?.stats) this.gui.stats.begin();
		if (this.canvas) this.canvas.update();
	}

	draw() {
		if (this.canvas) this.canvas.draw();
		if (this.gui?.stats) this.gui.stats.end();
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		const vw = this.el?.offsetWidth  || window.innerWidth;
		const vh = this.el?.offsetHeight || window.innerHeight;

		if (this.canvas) this.canvas.resize(vw, vh);
	}

	keyup(e) {
		// g or p
		if (e.keyCode == 71 || e.keyCode == 80) { if (this.gui) this.gui.toggle(); }
	}
}