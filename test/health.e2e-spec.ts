import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '@/app';

describe('GET /health', () => {
	const app = createApp();

	it('returns status ok', async () => {
		const response = await request(app).get('/health');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('ok');
	});

	it('returns 404 for unknown routes', async () => {
		const response = await request(app).get('/unknown');

		expect(response.status).toBe(404);
	});
});
