import * as THREE from 'three';
import { Pane } from 'tweakpane';
import Stats from 'stats.js';

export default class GUIView {

	constructor(app) {
		this.app = app;

		this.color = '#0000FF';
		this.number = 2;

		this.initPane();
		this.initStats();

		this.enable();
	}

	initPane() {
		let folder;
		
		document.title = `APP ${APP_VERSION}`;

		this.pane = new Pane({ title: document.title });
		this.pane.containerElem_.classList.add('full');

		folder = this.pane.addFolder({ title: 'SETTINGS' });
		folder.addBinding(this, 'color').on('change', this.onColorChange.bind(this));
		folder.addBinding(this, 'number', { min: 0, max: 10 });
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

	onColorChange(e) {
		this.app.webgl.object3D.material.uniforms.uColor.value.setStyle(e.value);
	}
}