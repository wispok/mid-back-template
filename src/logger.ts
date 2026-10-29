import pino from 'pino';

import { env } from '@/env';

export const logger = pino({
	base: { service: env.SERVICE_NAME },
	level: env.LOG_LEVEL,
	messageKey: 'message',
	redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
	timestamp: pino.stdTimeFunctions.isoTime,
});
