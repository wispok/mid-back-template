import { describe, expect, it } from 'vitest';

import { HttpError } from '@/errors';

describe('HttpError', () => {
	it('keeps status code, message and details', () => {
		const error = new HttpError(422, 'Invalid', { field: 'email' });

		expect(error.statusCode).toBe(422);
		expect(error.message).toBe('Invalid');
		expect(error.details).toEqual({ field: 'email' });
	});
});
