import AsyncPreloader from 'async-preloader';

const preload = (manifest = {}) => {
	const { items } = manifest;

	const pItems = items.map(item => AsyncPreloader.loadItem(item));
	const pApp = import('./App');
	const pProgress = [pApp, ...pItems];

	let loadCount = 0;
	let loadProgress = 0;

	Promise.all(
		pProgress.map(p => {
			p.then(() => {
				loadCount++;
				loadProgress = loadCount / pProgress.length;
				// console.log(loadProgress);
			});
			return p;
		})
	)
	.then(([app]) => {
		window.app = new app.default();
		window.app.init();
	})
	.catch(e => console.log('preload', e));
}

// load manifest
(() => fetch('data/manifest.json')
	.then(response => response.json())
	.then(response => { return preload(response) })
)();
