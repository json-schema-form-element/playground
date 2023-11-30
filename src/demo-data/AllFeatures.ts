/* eslint-disable max-lines */
import type { UiSchema, JSONSchema7 } from '@jsfe/form';

export const schema: JSONSchema7 = {
	title: 'All features',

	properties: {
		Object: {
			title: 'Object type',
			description: 'Nests each property to a field in a fieldset.',
			required: ['TextBar'],
			properties: {
				TextFoo: {
					title: 'Some text input',
					type: 'string',
					description: 'The help text is from "description".',
				},

				TextBar: {
					title: 'Some other -required- text input',
					type: 'string',
				},
			},
		},

		Primitives: {
			title: 'Primitive field types',
			properties: {
				Strings: {
					required: ['StringConstrained'],
					properties: {
						SimpleString: {
							title: 'Simple inline string',
							type: 'string',
							default: 'With default value from schema',
						},

						StringConstrained: {
							title: 'String with constraints',
							type: 'string',
							pattern: '^[A-Z \\d\\W]+$',
							minLength: 2,
							maxLength: 10,
							description: 'Only UPPERCASE with 2 to 10 characters is allowed.',
						},

						Password: {
							title: 'Password format',
							type: 'string',
							format: 'password',
							minLength: 8,
							maxLength: 64,
							// description: 'Make it strong!',
						},

						Email: {
							title: 'Email format',
							type: 'string',
							format: 'email',
							minLength: 3,
						},

						TextArea: {
							title: 'Text area',
							description: 'Using UI schema options.',
							type: 'string',
							minLength: 100,
							maxLength: 1200,
						},

						Color: {
							title: 'Color picker',
							type: 'string',
							default: '#4a90e2',
							description: 'Choose a nice color!',
						},
					},
				},

				Numbers: {
					properties: {
						Float: {
							title: 'Number (float)',
							// description: 'Using "ui:widget: textarea" in UI schema.',
							type: 'number',
						},

						Integer: {
							default: 5,
							title: 'Number (integer)',
							// description: 'Using "ui:widget: tadditional item oneextarea" in UI schema.',
							type: 'integer',
						},

						NumberConstrained: {
							title: 'Number with constraints',
							description: 'min + max + multiple of',
							type: 'integer',
							// default
							minimum: 50,
							maximum: 100,
							multipleOf: 10,
						},

						Range: {
							title: 'Range with default',
							default: 28,
							description: 'Using "ui:widget: range" in UI schema.',
							type: 'integer',
						},

						RangeConstrained: {
							title: 'Range  with constraints',
							// description: 'Using "ui:widget: textarea" in UI schema.',
							type: 'integer',
							// default
							minimum: -50,
							maximum: 50,
							multipleOf: 25,
						},

						Rating: {
							title: 'Rating',
							description: '10 stars, With half star precision.',
							type: 'number',
							minimum: 0,
							maximum: 10,
							multipleOf: 0.5,
							default: 5,
						},
					},
				},

				Booleans: {
					required: ['Checkbox', 'RadioWithDefault'],
					properties: {
						Checkbox: {
							title: 'Checkbox (default)',
							type: 'boolean',
							description: 'Check me!',
						},

						CheckboxWithData: {
							title: 'Checkbox',
							type: 'boolean',
							description: 'With existing value.',
						},

						Switch: {
							title: 'Switch, enabled by default',
							type: 'boolean',
							default: true,
						},

						Radio: {
							title: 'Radio',
							type: 'boolean',
						},

						RadioWithDefault: {
							title: 'Radio, with default',
							type: 'boolean',
							default: false,
						},

						ButtonsGroup: {
							title: 'Buttons group',
							type: 'boolean',
						},
					},
				},

				Enumerations: {
					properties: {
						Selects: {
							required: ['Number'],
							title: 'Select menu (default)',
							properties: {
								String: {
									title: 'String',
									type: 'string',
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
								},

								Number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
									description: 'With default value set',
									default: 1_000,
								},
							},
						},

						Radios: {
							title: 'Radios group',
							properties: {
								String: {
									title: 'String',
									type: 'string',
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
								},

								Number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
									description: 'With default value set',
									default: 1_000,
								},
							},
						},

						ButtonsGroup: {
							title: 'Buttons group',
							properties: {
								String: {
									title: 'String',
									type: 'string',
									enum: ['Joe', 'William', 'Jack', 'Averell'],
									default: 'Averell',
									description: 'With default value set',
								},

								Number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
								},
							},
						},
					},
				},

				Date: {
					title: 'Date and time',
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
			},
		},

		Arrays: {
			properties: {
				Primitives: {
					type: 'array',
					title: 'List of strings',
					items: {
						type: 'string',
						default: 'Lorem ipsum dolor amet',
					},
				},

				Objects: {
					title: 'Array of objects',
					type: 'array',
					items: {
						title: 'Sub-object in array',
						properties: {
							textA: {
								title: 'Field Alpha',
								type: 'string',
							},

							textB: {
								title: 'Field Beta',
								type: 'string',
							},
						},
					},
				},

				Fixed: {
					title: 'Fixed array',
					type: 'array',
					items: [
						{
							title: 'A number',
							type: 'number',
							default: 42,
						},

						{
							title: 'A boolean',
							type: 'boolean',
							default: false,
						},

						{
							title: 'An object',
							properties: {
								when: {
									title: 'A date',
									type: 'string',
									format: 'date',
								},
							},
						},
					],
				},

				PrepopulatedNested: {
					title: 'Prepopulated and nested arrays',
					type: 'array',
					items: {
						title: 'Sub-array',
						// title: 'Group',
						type: 'array',
						items: {
							title: 'Field in sub-array',
							type: 'string',
						},
					},
				},

				MultipleChoicesCheckboxes: {
					title: 'A multiple choices list with checkboxes',
					type: 'array',
					uniqueItems: true,
					description: 'Please choose yum yum.',
					default: ['Baguette', 'Beaufort', 'Tomato', 'Avocado'],
					items: {
						// NOTE: Unused for now. Too noisy?
						// title: 'Food',
						// description: '...',
						type: 'string',
						enum: [
							'Apple',
							'Pineapple',
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

				MultipleChoicesSelect: {
					title: 'A multiple choices list with select menu',
					type: 'array',
					uniqueItems: true,
					description: 'Please choose yum yum for tomorrow.',
					default: ['Apple', 'Avocado', 'Mango', 'Banana', 'Pineapple'],
					items: {
						// NOTE: Unused for now. Too noisy?
						// title: 'Food',
						// description: '...',
						type: 'string',
						enum: [
							'Apple',
							'Pineapple',
							'Banana',
							'Mango',
							'Tomato',
							'Baguette',
							'Beaufort',
							'Comté affiné',
							'Avocado',
						],
					},
				},
			},
		},

		CustomWidgets: {
			title: 'Custom widgets',
			properties: {
				MyCustomWidgetSignature: {
					title: 'Signature',
					description: "Let's draw your best signature!",
					type: 'string',
				},

				MyCustomWidgetBigButton: {
					title: 'UUID generator',
					description: 'Gotta click me for sure!',
					type: 'string',
				},

				MyCustomWidgetRte: {
					title: 'Rich Text Editor',
					// description: '...',
					type: 'string',
				},
			},
		},
	},
};

export const ui: UiSchema = {
	Primitives: {
		Strings: {
			TextArea: {
				'ui:widget': 'textarea',
				'ui:placeholder': 'This is a placeholder',
			},

			Color: {
				'ui:widget': 'color',
			},
		},

		Numbers: {
			Range: {
				'ui:widget': 'range',
			},

			RangeConstrained: {
				'ui:widget': 'range',
			},

			Rating: {
				'ui:widget': 'rating',
			},
		},

		Booleans: {
			Switch: {
				'ui:widget': 'switch',
			},

			Radio: {
				'ui:widget': 'radio',
			},

			RadioWithDefault: {
				'ui:widget': 'radio',
			},

			ButtonsGroup: {
				'ui:widget': 'button',
			},
		},

		Enumerations: {
			Radios: {
				String: {
					'ui:widget': 'radio',
				},

				Number: {
					'ui:widget': 'radio',
				},
			},

			ButtonsGroup: {
				String: {
					'ui:widget': 'button',
				},

				Number: {
					'ui:widget': 'button',
				},
			},

			// buttonGroup: {
			// 	'ui:widget': 'button',
			// },
		},
	},

	Arrays: {
		MultipleChoicesSelect: {
			'ui:widget': 'select',
		},
	},

	CustomWidgets: {
		MyCustomWidgetSignature: {
			'ui:widget': 'myCustomWidgetSignature',
		},

		MyCustomWidgetBigButton: {
			'ui:widget': 'myCustomWidgetBigButton',
			'ui:placeholder': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		},

		MyCustomWidgetRte: {
			'ui:widget': 'myCustomWidgetRte',
		},
	},
};

export const data = {
	Arrays: {
		Primitives: [['Try me!']],
		Objects: [{}],
		PrepopulatedNested: [['Hello', 'Ola']],
	},

	Primitives: {
		Strings: {
			Password: 'Science avec patience',
			Email: 'foo@bar.home.arpa',
		},

		Booleans: {
			CheckboxWithData: true,
			ButtonsGroup: false,
		},
	},

	CustomWidgets: {
		// MyCustomWidgetRte: '<strong>Hello</strong>',
	},
};
