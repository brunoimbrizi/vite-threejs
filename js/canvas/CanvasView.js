export default class CanvasView {
	
	constructor(app) {
		this.app = app;

		this.width  = 1080;
		this.height = 1080;

		this.color = '#0000FF';
		this.units = 10;

		this.initCanvas();
	}

	initCanvas() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		
	}

	draw() {
		const { canvas, context } = this;

		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);

		/////////////////////////
		// quick example
		/////////////////////////

		const { color, units } = this;

		const rw 		= 400;
		const rh 		= 10;
		const sq 		= rw / Math.sqrt(2);
		const gap 	= (rw - rh * units) / units;

		let rx, ry;

		context.save();
		context.translate(canvas.width * 0.5, canvas.height * 0.5);

		context.beginPath();
		context.rect(sq * -0.5, sq * -0.5, sq, sq);
		context.clip();

		context.rotate(Math.PI * 0.25);
		context.fillStyle = color;

		for (let i = 0; i < units; i++) {
			rx = rw * -0.5;
			ry = rh * -0.5 + i * (rh + gap);
			ry -= (rh + gap) * (units - 1) * 0.5;
			context.fillRect(rx, ry, rw, rh);
		}

		context.restore();

		/////////////////////////
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize(vw, vh) {
		const { canvas, width, height } = this;
		const margin = 32;
		const aspect = width / height;
		let aw, ah;

		// calculate aspect width and height
		if (width / height < vw / vh) {
			ah = Math.min(vh - margin * 2, height);
			aw = ah * aspect;
		}
		else {
			aw = Math.min(vw - margin * 2, width);
			ah = aw / aspect;
		}

		canvas.width  = width;
		canvas.height = height;

		canvas.style.width  = `${aw}px`;
		canvas.style.height = `${ah}px`;
	}
}
