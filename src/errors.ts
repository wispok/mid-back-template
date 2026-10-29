import type { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';

export class HttpError extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
		public readonly details?: unknown,
	) {
		super(message);
		this.name = 'HttpError';
	}
}

export const notFoundMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
	next(new HttpError(404, `Route ${req.method} ${req.path} not found`));
};

export const errorHandlerMiddleware = (error: unknown, req: Request, res: Response, _next: NextFunction): void => {
	if (error instanceof HttpError) {
		res.status(error.statusCode).json({ details: error.details, message: error.message });
		return;
	}

	if (error instanceof ZodError) {
		res.status(400).json({ details: error.issues, message: 'Validation failed' });
		return;
	}

	req.log.error({ err: error, event: { name: 'http.unhandled_error', outcome: 'failure' } }, 'Unhandled error');
	res.status(500).json({ message: 'Internal server error' });
};
