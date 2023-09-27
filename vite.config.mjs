import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { minifyHTML } from 'rollup-plugin-minify-html-literals';

export default defineConfig({
	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/*.svg',

					dest: 'shoelace/assets/icons',
				},
			],
		}),
	],

	build: {
		rollupOptions: {
			plugins: [minifyHTML()], // NOTE: not that useful…
		},
	},
});
