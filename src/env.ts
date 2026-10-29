import { z } from 'zod';

const envSchema = z.object({
	APP_PORT: z.coerce.number().int().positive().default(3000),
	CORS_ORIGIN: z.string().default('*'),
	LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	SERVICE_NAME: z.string().default('express-template'),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error('Invalid environment variables', z.treeifyError(parsed.error));
	process.exit(1);
}

export const env: Env = parsed.data;
