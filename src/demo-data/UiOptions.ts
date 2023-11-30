/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

// TODO: Typings with JSON Schema to TS
export const data = {
	firstName: 'Chuck',
	lastName: 'Norris',
	age: 75,
	bio: 'Roundhouse kicking asses since 1940',
	password: 'noneed',
	telephone: '1-800-KICKASS',
};

export const schema: JSONSchema7 = {
	title: 'UI options',
	description: 'A simple form example.',

	type: 'object',
	required: ['FirstName', 'LastName'],

	properties: {
		Telephone: {
			type: 'string',
			title: 'Telephone',
			minLength: 10,
		},
	},
};

export const ui = {
	Telephone: {
		'ui:options': {
			inputType: 'tel',
		},
	},
};
