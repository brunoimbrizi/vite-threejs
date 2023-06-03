import '../scss/style.scss';

import CanvasView from './canvas/CanvasView';
import GUIView from './gui/GUIView';

import { exportFrame } from './utils/export.utils';

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
		window.addEventListener('keydown', this.keydown.bind(this));
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
		this.gui?.stats?.begin();
		this.canvas?.update();
	}

	draw() {
		this.canvas?.draw();
		this.gui?.stats?.end();
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		const vw = this.el?.offsetWidth  || window.innerWidth;
		const vh = this.el?.offsetHeight || window.innerHeight;

		this.canvas?.resize(vw, vh);
	}

	keydown(e) {
		// g or p
		if (e.keyCode == 71 || e.keyCode == 80) { if (this.gui) this.gui.toggle(); }
		// ctrl + s
		if (e.keyCode === 83 && !e.altKey && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			exportFrame(this.canvas.canvas);
		}
	}
}