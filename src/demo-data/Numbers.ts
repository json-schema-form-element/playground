import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	type: 'object',
	title: 'Numbers',

	properties: {
		Number: {
			title: 'Number',
			type: 'number',
		},

		Integer: {
			title: 'Integer',
			type: 'integer',
			default: 42,
		},

		NumberEnum: {
			type: 'number',
			title: 'Number enum select',
			enum: [1, 2, 3],
		},

		NumberEnumRadio: {
			type: 'number',
			title: 'Number enum radio',
			enum: [1, 2, 3, 4, 5],
			default: 2,
		},

		NumberEnumButtonGroup: {
			type: 'number',
			title: 'Number button group',
			enum: [1, 2, 3, 4, 5],
		},

		IntegerRange: {
			title: 'Integer range',
			type: 'integer',
			minimum: -50,
			maximum: 50,
			default: 42,
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

	NumberEnumButtonGroup: {
		'ui:widget': 'button',
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
	NumberEnum: 2,
	IntegerRangeSteps: 60,
};
