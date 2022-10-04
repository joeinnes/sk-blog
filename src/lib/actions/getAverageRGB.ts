import { FastAverageColor } from 'fast-average-color';
import type { Writable } from 'svelte/store';

export const getAverageRGB = (imgEl: HTMLImageElement, storeToUpdate: Writable<string>) => {
	imgEl.crossOrigin = 'anonymous';
	imgEl.onload = () => {
		const height = imgEl.naturalHeight;
		const width = imgEl.naturalWidth;
		const canvas = new OffscreenCanvas(width || 1024, height || 768);
		const ctx = canvas.getContext('2d');
		ctx?.drawImage(imgEl, 0, 0);
		const fac = new FastAverageColor();
		fac.getColorAsync(canvas).then(colour => storeToUpdate.set(colour.rgba));
	}
};
