const getAverageRGB = (imgEl: HTMLImageElement, ret: string) {
	imgEl.crossOrigin = 'Anonymous';
	var blockSize = 1, // only visit every 5 pixels
		defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
		canvas = document.createElement('canvas'),
		context = canvas.getContext && canvas.getContext('2d'),
		data,
		width,
		height,
		i = 0,
		length,
		rgb = { r: 0, g: 0, b: 0 },
		count = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height = 1;
	width = canvas.width = 1;

	context.drawImage(imgEl, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch (e) {
		/* security error, img on diff domain */
		console.error(e);
		return defaultRGB;
	}

	length = data.data.length;

	while (i++ < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);
  const { r, g, b } = rgb;
	ret = `rgb(${r + ''}, ${g+''}, ${b+''}`;
  return ret;
}
