/* eslint-disable max-lines */
import type { UiSchema, JSONSchema7 } from '@jsfe/form';

export const schema: JSONSchema7 = {
	title: 'UI schemas',

	properties: {
		Overrides: {
			description: 'In case you need to customize labels displays.',
			required: ['TextFoo'],
			properties: {
				TextFoo: {
					title: 'Original title',
					description: 'Original description',
					type: 'string',
				},

				TextPass: {
					title: 'Password',
					description:
						'Can be called either with `"format" = "password"` or `"ui:widget" = "password"`',
					type: 'string',
				},

				// TextBar: {
				// 	title: 'Some other -required- text input',
				// 	type: 'string',
				// },
			},
		},

		DisabledOrReadOnly: {
			title: 'Disabled / Read only',

			description: 'Note: not all field types support read only mode',
			properties: {
				DisabledText: {
					type: 'string',
					title: 'Disabled text input',
				},

				ReadOnlyText: {
					type: 'string',
					title: 'Read only text input',
					description: "But at least I'm more readable",
				},

				DisabledCheckbox: {
					type: 'boolean',
					title: 'Disabled checkbox',
					description: "You don't have a choice! Just accept it.",
				},

				DisabledSwitch: {
					type: 'boolean',
					title: 'Disabled switch',
				},

				DisabledRange: {
					title: 'Disabled range',
					type: 'number',
				},

				DisabledRating: {
					title: 'Disabled rating',
					type: 'number',
				},

				ReadOnlyRating: {
					title: 'Read only rating',
					type: 'number',
				},

				DisabledSelect: {
					title: 'Disabled select',
					type: 'string',
					enum: ['foo', 'bar', 'baz'],
				},

				DisabledRadioGroup: {
					title: 'Disabled radio group',
					type: 'string',
					enum: ['foo', 'bar', 'baz'],
				},
				DisabledRadioGroupBoolean: {
					title: 'Disabled radio group boolean',
					type: 'boolean',
				},

				DisabledColorPicker: {
					title: 'Disabled color picker',
					type: 'string',
				},

				DisabledTextArea: {
					type: 'string',
					title: 'Disabled text area',
				},

				ReadOnlyTextArea: {
					type: 'string',
					title: 'Read only text area',
				},

				DisabledNumber: {
					title: 'Disabled number',
					type: 'number',
				},
				ReadOnlyNumber: {
					title: 'Disabled number',
					type: 'number',
				},

				DisabledDate: {
					title: 'Disabled date',
					type: 'string',
					format: 'date-time',
				},
				ReadOnlyDate: {
					title: 'Read only date',
					type: 'string',
					format: 'date-time',
				},

				DisabledMultipleChoicesSelect: {
					title: 'Disabled multiple choices select menu',
					type: 'array',
					uniqueItems: true,
					description: 'Please choose yum yum for tomorrow.',
					default: ['Apple', 'Avocado', 'Mango'],
					items: {
						type: 'string',
						enum: [
							'Apple',
							'Mango',
							'Beaufort',
							'Comté affiné 6 mois',
							'Avocado',
						],
					},
				},

				DisabledMultipleChoicesCheckboxes: {
					title: 'Disabled multiple choices checkboxes',
					type: 'array',
					uniqueItems: true,
					description: 'Please choose yum yum.',
					default: ['Apple'],
					items: {
						type: 'string',
						enum: ['Apple', 'Pineapple', 'Banana'],
					},
				},

				DisabledButtonsGroup: {
					title: 'Disabled buttons group',
					type: 'string',
					enum: ['Joe', 'William', 'Jack', 'Averell'],
					default: 'Averell',
				},

				DisabledButtonsGroupBoolean: {
					title: 'Disabled boolean buttons group',
					type: 'boolean',
					default: true,
				},
			},
		},
	},
};

export const ui: UiSchema = {
	Overrides: {
		TextFoo: {
			'ui:title': 'Overriden title',
			'ui:description': 'Overriden description',
			'ui:placeholder': 'My placeholder',
		},

		TextPass: {
			'ui:widget': 'password',
		},

		// SmallField: {
		// 	'ui:size': 'small',
		// },
	},

	DisabledOrReadOnly: {
		DisabledText: {
			'ui:disabled': true,
		},

		ReadOnlyText: {
			'ui:readonly': true,
		},

		DisabledCheckbox: {
			'ui:disabled': true,
		},

		DisabledSwitch: {
			'ui:widget': 'switch',
			'ui:disabled': true,
		},

		DisabledRange: {
			'ui:widget': 'range',
			'ui:disabled': true,
		},

		DisabledRating: {
			'ui:widget': 'rating',
			'ui:disabled': true,
		},
		ReadOnlyRating: {
			'ui:widget': 'rating',
			'ui:readonly': true,
		},

		DisabledSelect: {
			'ui:disabled': true,
		},

		DisabledRadioGroup: {
			'ui:widget': 'radio',
			'ui:disabled': true,
		},
		DisabledRadioGroupBoolean: {
			'ui:widget': 'radio',
			'ui:disabled': true,
		},

		DisabledColorPicker: {
			'ui:widget': 'color',
			'ui:disabled': true,
		},

		DisabledTextArea: {
			'ui:widget': 'textarea',
			'ui:disabled': true,
		},
		ReadOnlyTextArea: {
			'ui:widget': 'textarea',
			'ui:readonly': true,
		},

		ReadOnlyNumber: {
			'ui:readonly': true,
		},
		DisabledNumber: {
			'ui:disabled': true,
		},

		ReadOnlyDate: {
			'ui:readonly': true,
		},
		DisabledDate: {
			'ui:disabled': true,
		},

		DisabledMultipleChoicesSelect: {
			'ui:widget': 'select',
			'ui:disabled': true,
		},
		DisabledMultipleChoicesCheckboxes: {
			'ui:disabled': true,
		},

		DisabledButtonsGroup: {
			'ui:widget': 'button',
			'ui:disabled': true,
		},
		DisabledButtonsGroupBoolean: {
			'ui:widget': 'button',
			'ui:disabled': true,
		},
	},
};

export const data = {
	Overrides: {
		TextPass: 'very_secure_password_123',
	},

	DisabledOrReadOnly: {
		DisabledText: "You can't edit me 🫥",

		ReadOnlyText: "You can't edit me neither 🫥",

		DisabledCheckbox: true,
		DisabledRange: 42,

		DisabledRating: 3.5,
		ReadOnlyRating: 3.5,

		DisabledSelect: 'foo',
		DisabledRadioGroup: 'foo',
		DisabledRadioGroupBoolean: false,

		DisabledTextArea: "Don't even try!",
		ReadOnlyTextArea: "Don't even try!",

		DisabledNumber: 420,
		ReadOnlyNumber: 420,

		DisabledDate: '2023-11-30T14:39:30.704Z',
		ReadOnlyDate: '2023-11-30T14:39:30.704Z',
	},
};
