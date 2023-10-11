import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	type: 'object',
	title: 'Number fields & widgets',

	properties: {
		Number: {
			title: 'Number',
			type: 'number',
		},

		Integer: {
			title: 'Integer',
			type: 'integer',
		},

		NumberEnum: {
			type: 'number',
			title: 'Number enum select',
			enum: [1, 2, 3],
		},

		NumberEnumRadio: {
			type: 'number',
			title: 'Number enum radio',
			enum: [1, 2, 3],
		},

		IntegerRange: {
			title: 'Integer range',
			type: 'integer',
			minimum: -50,
			maximum: 50,
		},

		IntegerRangeSteps: {
			title: 'Integer range (by 10)',
			type: 'integer',
			minimum: 50,
			maximum: 100,
			multipleOf: 10,
		},
	},
};

export const ui = {
	Integer: {
		'ui:widget': 'updown',
	},

	NumberEnumRadio: {
		'ui:widget': 'radio',
		'ui:options': {
			inline: true,
		},
	},

	IntegerRange: {
		'ui:widget': 'range',
	},

	IntegerRangeSteps: {
		'ui:widget': 'range',
	},
};

export const data = {
	Number: 6.14,
	Integer: 42,
	NumberEnum: 2,
	IntegerRange: 42,
	IntegerRangeSteps: 60,
};
