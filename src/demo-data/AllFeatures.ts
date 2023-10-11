/* eslint-disable max-lines */
import type { UiSchema, JSONSchema7 } from '@jsfe/form';

export const schema: JSONSchema7 = {
	title: 'All Features',
	properties: {
		Object: {
			title: 'Object type',
			description: 'Nests each property to a field in a fieldset.',
			required: ['textBar'],
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
					required: ['stringConstrained'],
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
						},
					},
				},
				Booleans: {
					required: ['checkbox', 'radioWithDefault'],
					properties: {
						Checkbox: {
							title: 'Checkbox (default)',
							type: 'boolean',
							description: 'Check me!',
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
							required: ['number'],
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
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
									default: 'Ola',
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
				Basic: {
					title: 'Basic array',
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
};

export const data = {
	Arrays: {
		PrepopulatedNested: [['Hello', 'Ola']],
	},
};
