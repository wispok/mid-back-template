import { createApp } from '@/app';
import { env } from '@/env';
import { logger } from '@/logger';

const server = createApp().listen(env.APP_PORT, () => {
	logger.info({ event: { name: 'app.started', outcome: 'success' }, port: env.APP_PORT }, 'Server listening');
});

const shutdown = (signal: string): void => {
	logger.info({ event: { name: 'app.stopping' }, signal }, 'Shutting down');
	server.close(() => process.exit(0));
	setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
