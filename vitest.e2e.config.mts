import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
	},
	test: {
		env: { LOG_LEVEL: 'silent', NODE_ENV: 'test' },
		include: ['test/**/*.e2e-spec.ts'],
	},
});
