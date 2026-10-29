import eslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { ESLint, Linter } from 'eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['./src/**/*.ts', './test/**/*.ts', './eslint.config.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': eslintPlugin as unknown as ESLint.Plugin,
			perfectionist,
			prettier,
			sonarjs,
			'unused-imports': unusedImports,
		},
		rules: {
			...eslintPlugin.configs.recommended.rules,
			...(sonarjs.configs!.recommended as Linter.Config).rules,
			...perfectionist.configs['recommended-natural'].rules,

			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': 'off',

			'array-bracket-spacing': ['error', 'never'],
			'keyword-spacing': ['error', { after: true }],
			'no-unused-vars': 'off',
			'perfectionist/sort-classes': 'off',
			'perfectionist/sort-interfaces': [
				'error',
				{
					groups: ['unknown', 'method'],
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'perfectionist/sort-object-types': [
				'error',
				{
					groups: ['unknown', 'method'],
					order: 'asc',
					type: 'alphabetical',
				},
			],
			'prefer-const': 'error',
			'prettier/prettier': [
				'error',
				{
					bracketSpacing: true,
					endOfLine: 'auto',
					printWidth: 120,
					semi: true,
					singleQuote: true,
					tabWidth: 2,
					trailingComma: 'all',
					useTabs: true,
				},
			],

			'sonarjs/no-commented-code': 'off',
			'sonarjs/no-unused-vars': 'off',
			'sonarjs/todo-tag': 'off',

			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		},
	},
]);
