/* eslint-disable max-lines */
import type { UiSchema, JSONSchema7 } from '@jsfe/core';

export const schema: JSONSchema7 = {
	title: 'All Features',
	properties: {
		object: {
			title: 'Object type',
			description: 'Nests each property to a field in a fieldset.',
			required: ['textBar'],
			properties: {
				textFoo: {
					title: 'Some text input',
					type: 'string',
					description: 'The help text is from "description".',
				},
				textBar: {
					title: 'Some other -required- text input',
					type: 'string',
				},
			},
		},
		primitive: {
			title: 'Primitive field types',
			properties: {
				string: {
					title: 'String',
					required: ['stringConstrained'],
					properties: {
						simpleString: {
							title: 'Simple inline string',
							type: 'string',
							default: 'With default value from schema',
						},
						stringConstrained: {
							title: 'String with constraints',
							type: 'string',
							pattern: '^[A-Z \\d\\W]+$',
							minLength: 2,
							maxLength: 10,
							description: 'Only UPPERCASE with 2 to 10 characters is allowed.',
						},
						textArea: {
							title: 'Text area',
							description: 'Using UI schema options.',
							type: 'string',
						},
						color: {
							title: 'Color picker',
							type: 'string',
							default: '#4a90e2',
						},
					},
				},
				number: {
					title: 'Number',
					properties: {
						float: {
							title: 'Number (float)',
							// description: 'Using "ui:widget: textarea" in UI schema.',
							type: 'number',
						},
						integer: {
							default: 5,
							title: 'Number (integer)',
							// description: 'Using "ui:widget: tadditional item oneextarea" in UI schema.',
							type: 'integer',
						},
						numberConstrained: {
							title: 'Number with constraints',
							description: 'min + max + multiple of',
							type: 'integer',
							// default
							minimum: 50,
							maximum: 100,
							multipleOf: 10,
						},
						range: {
							title: 'Range with default',
							default: 28,
							// description: 'Using "ui:widget: textarea" in UI schema.',
							type: 'integer',
						},
						rangeConstrained: {
							title: 'Range  with constraints',
							// description: 'Using "ui:widget: textarea" in UI schema.',
							type: 'integer',
							// default
							minimum: -50,
							maximum: 50,
							multipleOf: 25,
						},
					},
				},
				boolean: {
					title: 'Boolean',
					properties: {
						checkbox: {
							title: 'Checkbox (default)',
							type: 'boolean',
						},
						switch: {
							title: 'Switch, enabled by default',
							type: 'boolean',
							default: true,
						},
						radio: {
							title: 'Radio',
							type: 'boolean',
						},
						radioWithDefault: {
							title: 'Radio, with default',
							type: 'boolean',
							default: false,
						},
						buttonGroup: {
							title: 'Button group',
							type: 'boolean',
						},
					},
				},
				enumeration: {
					title: 'Enumeration',
					properties: {
						select: {
							title: 'Select menu (default)',
							properties: {
								string: {
									title: 'String',
									type: 'string',
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
								},
								number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
									description: 'With default value set',
									default: 1_000,
								},
							},
						},
						radio: {
							title: 'Radio group',
							properties: {
								string: {
									title: 'String',
									type: 'string',
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
								},
								number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
									description: 'With default value set',
									default: 1_000,
								},
							},
						},
						buttonGroup: {
							title: 'Button group',
							properties: {
								string: {
									title: 'String',
									type: 'string',
									enum: ['Ola', 'Hello', 'Bonjour', 'Buongiorno', 'Guten Tag'],
									default: 'Ola',
									description: 'With default value set',
								},
								number: {
									title: 'Number',
									type: 'number',
									enum: [10, 100, 1_000, 10_000],
								},
							},
						},
					},
				},
				date: {
					title: 'Date and time',
					properties: {
						datetime: {
							title: 'Date and time',
							type: 'string',
							format: 'date-time',
							description: 'Hurry up!',
						},
						date: {
							title: 'Date',
							type: 'string',
							format: 'date',
						},
						time: {
							title: 'Time',
							type: 'string',
							format: 'time',
						},
					},
				},
			},
		},

		array: {
			title: 'Array',
			properties: {
				basic: {
					type: 'array',
					title: 'Basic array',
					items: {
						properties: {
							textA: {
								title: 'Some field A',
								type: 'string',
							},
							textB: {
								title: 'Some field B',
								type: 'string',
							},
						},
					},
				},

				fixed: {
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

				prepopulatedNested: {
					title: 'Prepopulated and nested arrays',
					type: 'array',
					items: {
						title: 'Group',
						// title: 'Group',
						type: 'array',
						items: {
							title: 'Some sub-field',
							type: 'string',
						},
					},
				},

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
			},
		},
	},
};

export const ui: UiSchema = {
	primitive: {
		string: {
			textArea: {
				'ui:widget': 'textarea',
				'ui:placeholder': 'This is a placeholder',
			},
			color: {
				'ui:widget': 'color',
			},
		},
		number: {
			range: {
				'ui:widget': 'range',
			},
			rangeConstrained: {
				'ui:widget': 'range',
			},
		},
		boolean: {
			switch: {
				'ui:widget': 'switch',
			},
			radio: {
				'ui:widget': 'radio',
			},
			radioWithDefault: {
				'ui:widget': 'radio',
			},
			buttonGroup: {
				'ui:widget': 'button-group',
			},
		},
		enumeration: {
			radio: {
				string: {
					'ui:widget': 'radio',
				},
				number: {
					'ui:widget': 'radio',
				},
			},
			buttonGroup: {
				string: {
					'ui:widget': 'button-group',
				},
				number: {
					'ui:widget': 'button-group',
				},
			},

			// buttonGroup: {
			// 	'ui:widget': 'button-group',
			// },
		},
	},
};

export const data = {
	array: {
		prepopulatedNested: [['Hello', 'Ola']],
	},
};
