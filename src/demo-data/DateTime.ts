import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	title: 'Date and time',
	type: 'object',
	properties: {
		Examples: {
			title: 'Native',
			description: 'Choose some dates or times…',
			type: 'object',
			properties: {
				DateTime: {
					title: 'Date and time',
					type: 'string',
					format: 'date-time',
					description: 'Hurry up!',
				},

				Date: {
					title: 'Date',
					type: 'string',
					format: 'date',
				},

				Time: {
					title: 'Time',
					type: 'string',
					format: 'time',
				},
			},
		},
		// alternative: {
		// 	title: 'Alternative',
		// 	description: 'These work on most platforms.',
		// 	type: 'object',
		// 	properties: {
		// 		'alt-datetime': {
		// 			type: 'string',
		// 			format: 'date-time',
		// 		},
		// 		'alt-date': {
		// 			type: 'string',
		// 			format: 'date',
		// 		},
		// 	},
		// },
	},
};

export const ui = {};
export const data = {
	Examples: {
		// NOTE: need more tests
		DateTime: new Date('2023-10-26T10:09:00.000Z'),
		// DateTime: '2023-09-30T12:07',

		Date: '2022-02-22',

		Time: '13:37',
	},
};
