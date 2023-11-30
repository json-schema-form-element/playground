/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

// TODO: Typings with JSON Schema to TS
export const data = {
	FirstName: 'Chuck',
	LastName: 'Norris',
	Age: new Date().getFullYear() - 1940,
	Email: 'chuck@norris.home.arpa',
	Bio: 'Roundhouse kicking asses since 1940',
	Password: 'noneed',
	Telephone: '1-800-KICKASS',
};

export const schema: JSONSchema7 = {
	title: 'Sign-up form',
	description: 'A simple form example.',

	type: 'object',
	required: ['FirstName', 'LastName'],

	properties: {
		FirstName: {
			type: 'string',
			title: 'First name',
			default: 'Chuck',
		},

		LastName: {
			type: 'string',
			title: 'Last name',
		},

		Age: {
			type: 'integer',
			title: 'Age',
			minimum: 13,
			maximum: 150,
		},

		Bio: {
			type: 'string',
			title: 'Bio',
		},

		Email: {
			title: 'Email',
			format: 'email',
			type: 'string',
		},

		Password: {
			type: 'string',
			title: 'Password',
			format: 'password',
			minLength: 3,
		},

		Telephone: {
			type: 'string',
			title: 'Telephone',
			minLength: 10,
		},
	},
};

export const ui = {
	FirstName: {
		// 'ui:autofocus': true,
		// 'ui:emptyValue': '',
		// 'ui:placeholder':
		// 	'ui:emptyValue causes this field to always be valid despite being required',
		// 'ui:autocomplete': 'family-name',
		// 'ui:enableMarkdownInDescription': true,
		// 'ui:description':
		// 	'Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).',
	},

	LastName: {
		// 'ui:autocomplete': 'given-name',
		// 'ui:enableMarkdownInDescription': true,
		// 'ui:description':
		// 	'Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ',
	},

	Age: {
		// 'ui:widget': 'updown',
		// 'ui:title': 'Age of person',
		// 'ui:description': '(earth year)',
	},

	Bio: {
		'ui:widget': 'textarea',
		'ui:placeholder':
			'Il était une fois est une expression qui, dans la tradition populaire, introduit un conte. Elle apparaît dans le titre de plusieurs œuvres artistiques ou littéraires.',
	},

	Password: {
		// 'ui:widget': 'password',
		// 'ui:help': 'Hint: Make it strong!',
		// 'ui:placeholder': '••••••••••••••••••••••',
	},

	Telephone: {
		'ui:options': {
			inputType: 'tel',
		},
	},
};
