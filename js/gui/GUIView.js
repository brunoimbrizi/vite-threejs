import { Pane } from 'tweakpane';
import Stats from 'stats.js';

export default class GUIView {

	constructor(app) {
		this.app = app;

		this.color = '#0000FF';
		this.units = 10;

		this.initPane();
		// this.initStats();

		this.enable();
	}

	initPane() {
		let folder;
		
		this.pane = new Pane();
		this.pane.containerElem_.classList.add('full');

		folder = this.pane.addFolder({ title: `App ${APP_VERSION}` });
		folder.addInput(this, 'color').on('change', this.onColorChange.bind(this));
		folder.addInput(this, 'units', { min: 1, max: 15, step: 1 }).on('change', this.onUnitsChange.bind(this));
	}

	initStats() {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	enable() {
		this.pane.hidden = false;
		if (this.stats) this.stats.dom.style.display = '';

		if (!this.pane.containerElem_.classList.contains('full')) return;
		this.app.el.style.width = `calc(100vw - ${this.pane.containerElem_.offsetWidth}px)`;
		this.app.resize();
	}

	disable() {
		this.pane.hidden = true;
		if (this.stats) this.stats.dom.style.display = 'none';

		if (!this.pane.containerElem_.classList.contains('full')) return;
		this.app.el.style.width = ``;
		this.app.resize();
	}

	toggle() {
		if (!this.pane.hidden) this.disable();
		else this.enable();
	}

	onColorChange() {
		this.app.canvas.color = this.color;
	}

	onUnitsChange() {
		this.app.canvas.units = this.units;
	}
}