/* eslint-disable max-lines */
import type { UiSchema, JSONSchema7 } from '@jsfe/core';

export const schema: JSONSchema7 = {
	definitions: {
		address: {
			type: 'object',
			properties: {
				street_address: {
					type: 'string',
				},
				city: {
					type: 'string',
				},
				state: {
					type: 'string',
				},
			},
			required: ['street_address', 'city', 'state'],
		},
		node: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				children: {
					type: 'array',
					items: {
						$ref: '#/definitions/node',
					},
				},
			},
		},
	},
	type: 'object',
	properties: {
		billing_address: {
			title: 'Billing address',
			$ref: '#/definitions/address',
		},
		shipping_address: {
			title: 'Shipping address',
			$ref: '#/definitions/address',
		},
		tree: {
			title: 'Recursive references',
			$ref: '#/definitions/node',
		},
	},
};

export const ui: UiSchema = {
	'ui:order': ['shipping_address', 'billing_address', 'tree'],
};
export const data = {
	tree: {
		children: [
			{
				name: 'leaf',
				children: [
					{
						children: [],
						name: 'dsdddd',
					},
				],
			},
		],
		name: 'root',
	},
	billing_address: {
		street_address: '21, Jump Street',
		city: 'Babel',
		state: 'Neverland',
	},
	shipping_address: {
		street_address: '221B, Baker Street',
		city: 'London',
		state: 'N/A',
	},
};

export const experimental = true;
