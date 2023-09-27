import { UiSchema } from '@jsfe/core';
import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	type: 'object',
	properties: { TEST: { type: 'string' } },
	oneOf: [
		{
			properties: {
				lorem: {
					type: 'string',
				},
			},
			required: ['lorem'],
		},
		{
			properties: {
				ipsum: {
					type: 'string',
				},
			},
			required: ['ipsum'],
		},
	],
};

export const ui: UiSchema = {};

export const data = {};

export const experimental = true;
