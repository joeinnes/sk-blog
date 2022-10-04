import { FastAverageColor } from 'fast-average-color';
import type { Writable } from 'svelte/store';

export const getAverageRGB = (imgEl: HTMLImageElement, storeToUpdate: Writable<string>) => {
	imgEl.crossOrigin = 'anonymous';
	const fac = new FastAverageColor();
	fac.getColorAsync(imgEl).then(colour => storeToUpdate.set(colour.rgba));
};
