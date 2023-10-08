/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	title: 'Tesdt',
	type: 'object',
	properties: {
		multipleChoices: {
			title: 'A multiple choices list with checkboxes',
			type: 'array',
			uniqueItems: true,
			description: 'Please choose yum yum.',
			items: {
				type: 'string',
				enum: [
					'Apple',
					'Banana',
					'Mango',
					'Tomato',
					'Baguette',
					'Beaufort',
					'Comté',
					'Avocado',
				],
			},
		},

		listOfStrings: {
			// type: 'string',
			// test: {
			// }
			type: 'array',
			// title: 'A list of strings',
			items: {
				properties: {
					s: {
						type: 'array',
						// title: 'A list of strings',
						items: {
							// type: 'string',
							type: 'array',
							// title: 'A list of strings',
							items: {
								type: 'string',
								// default: 'bazinga',
							},
						},
					},
					b: {
						type: 'boolean',
					},
				},
			},
		},
		// enumOfStrings: {
		// 	type: 'string',
		// 	// test: {
		// 	// }
		// 	// type: 'array',
		// 	title: 'An enum of strings',
		// 	enum: ['foo', 'bar'],
		// },
		bool: {
			type: 'boolean',
		},
		// anObj: {
		// 	properties: {
		// 		bool: {
		// 			type: 'boolean',
		// 		},
		// 		bool2: {
		// 			type: 'boolean',
		// 		},
		// 	},
		// },
	},
};

export const ui = {
	bool: {
		'ui:widget': 'switch',
	},
	listOfStrings: {
		b: {
			'ui:widget': 'switch',
		},
	},
	anObj: {
		bool: {
			'ui:widget': 'switch',
		},
	},
};

export const data = {
	// listOfStrings: [
	// 	//
	// 	{ s: ['A', 'B'], b: ['C', 'D'] },
	// 	{ s: ['A', 'B'], b: ['C', 'D'] },
	// ],
};
