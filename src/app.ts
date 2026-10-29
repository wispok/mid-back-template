import type { Express } from 'express';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { env } from '@/env';
import { errorHandlerMiddleware, notFoundMiddleware } from '@/errors';
import { logger } from '@/logger';

export const createApp = (): Express => {
	const app = express();

	app.disable('x-powered-by');
	app.use(helmet());
	app.use(cors({ origin: env.CORS_ORIGIN }));
	app.use(express.json());
	app.use(pinoHttp({ logger }));

	app.get('/health', (_req, res) => {
		res.json({ status: 'ok', uptime: process.uptime() });
	});

	// Register feature routers here, e.g. app.use('/users', usersRouter);

	app.use(notFoundMiddleware);
	app.use(errorHandlerMiddleware);

	return app;
};
