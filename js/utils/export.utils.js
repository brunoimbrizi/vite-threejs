import dateFormat from 'dateformat';

export const exportFrame = (canvas, fileFunction = null) => {
	const link = document.createElement('a');
	const timestamp = dateFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss');
	const extension = '.png';

	let filename = `${timestamp}${extension}`;

	if (fileFunction) filename = fileFunction({ canvas, timestamp, extension }); 

	link.download = filename;
	link.href = canvas.toDataURL();
	link.click();
	link.remove();
};
