import { FastAverageColor } from 'fast-average-color';
import { Writable } from 'svelte/store';

export const getAverageRGB = async (imgEl: HTMLImageElement, storeToUpdate: Writable<string>) => {
	imgEl.crossOrigin = 'Anonymous';
	const fac = new FastAverageColor();
	const colour = await fac.getColorAsync(imgEl);
	storeToUpdate.set(colour.rgba);
};
