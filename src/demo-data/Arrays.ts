/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	definitions: {
		Thing: {
			title: 'Thing',
			type: 'object',
			properties: {
				Name: {
					title: 'Name',
					type: 'string',
					default: 'Default name',
				},
			},
		},
	},

	title: 'Arrays',
	type: 'object',

	properties: {
		ListOfStrings: {
			type: 'array',
			title: 'A list of strings',
			items: {
				type: 'string',
				default: 'bazinga',
			},
		},

		MultipleChoicesList: {
			type: 'array',
			title: 'A multiple choices list',
			items: {
				type: 'string',
				enum: ['foo', 'bar', 'fuzz', 'qux'],
			},

			uniqueItems: true,
		},

		FixedItemsList: {
			type: 'array',
			title: 'A list of fixed items',
			items: [
				{
					title: 'A string value',
					type: 'string',
					default: 'lorem ipsum',
				},

				{
					title: 'a boolean value',
					type: 'boolean',
				},
			],
			// NOTE: Not implemented
			// additionalItems: {
			// 	title: 'Additional item',
			// 	type: 'number',
			// },
		},

		MinItemsList: {
			type: 'array',
			title: 'A list with a minimal number of items',
			minItems: 3,
			items: {
				$ref: '#/definitions/Thing',
			},
		},

		DefaultsAndMinItems: {
			type: 'array',
			title: 'List and item level defaults',
			minItems: 5,
			default: ['carp', 'trout', 'bream'],
			items: {
				type: 'string',
				default: 'unidentified',
			},
		},

		NestedList: {
			type: 'array',
			title: 'Nested list',
			items: {
				type: 'array',
				title: 'Inner list',
				items: {
					type: 'string',
					default: 'lorem ipsum',
				},
			},
		},

		// NOTE: UI stuff from RSJF
		// unorderable: {
		//   title: "Unorderable items",
		//   type: "array",
		//   items: {
		//     type: "string",
		//     default: "lorem ipsum",
		//   },
		// },
		// copyable: {
		//   title: "Copyable items",
		//   type: "array",
		//   items: {
		//     type: "string",
		//     default: "lorem ipsum",
		//   },
		// },
		// unremovable: {
		//   title: "Unremovable items",
		//   type: "array",
		//   items: {
		//     type: "string",
		//     default: "lorem ipsum",
		//   },
		// },
		// noToolbar: {
		//   title: "No add, remove and order buttons",
		//   type: "array",
		//   items: {
		//     type: "string",
		//     default: "lorem ipsum",
		//   },
		// },
		// fixedNoToolbar: {
		// 	title: 'Fixed array without buttons',
		// 	type: 'array',
		// 	items: [
		// 		{
		// 			title: 'A number',
		// 			type: 'number',
		// 			default: 42,
		// 		},

		// 		{
		// 			title: 'A boolean',
		// 			type: 'boolean',
		// 			default: false,
		// 		},

		// 	],

		// TODO:
		// 	additionalItems: {
		// 		title: 'A string',
		// 		type: 'string',
		// 		default: 'lorem ipsum',
		// 	},
		// },
	},
};

export const ui = {};

export const data = {
	ListOfStrings: ['foo', 'bar'],

	MultipleChoicesList: ['foo', 'bar'],

	FixedItemsList: ['Some text', true, 123],

	MinItemsList: [
		{ name: 'Default name A' },
		{ name: 'Default name B' },
		{ name: 'Default name C' },
	],

	DefaultsAndMinItems: [
		'carp',
		'trout',
		'bream',
		'unidentified',
		'unidentified',
	],

	NestedList: [['lorem', 'ipsum'], ['dolor']],

	Unorderable: ['one', 'two'],

	Copyable: ['one', 'two'],

	Unremovable: ['one', 'two'],

	NoToolbar: ['one', 'two'],

	FixedNoToolbar: [42, true, 'additional item one', 'additional item two'],
};
