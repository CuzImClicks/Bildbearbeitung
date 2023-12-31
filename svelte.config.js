import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events'
		|| warning.code === 'a11y-no-noninteractive-element-interactions'
		|| warning.code === "a11y-no-static-element-interactions") return
		handler(warning)
	},
};

export default config;
