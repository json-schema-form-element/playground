// NOTE: EXPERIMENTAL

import type { JSONSchema7 } from 'json-schema';

// TODO: Deep merge not implemented, shallow for now
export const schema: JSONSchema7 = {
	type: 'object',
	allOf: [
		{
			properties: {
				lorem: {
					type: ['string', 'boolean'],
					default: true,
				},
			},
		},
		{
			properties: {
				lorem: {
					type: 'boolean',
				},
				ipsum: {
					type: 'string',
				},
			},
		},
	],
};

export const data = {
	lorem: true,
};

export const ui = {};

export const experimental = true;
