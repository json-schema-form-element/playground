import type { JSONSchema7 } from 'json-schema';

import * as AllFeatures from './AllFeatures.js';
import * as Nullable from './Nullable.js';
import * as Arrays from './Arrays.js';
import * as Simple from './Simple.js';
import * as Nested from './Nested.js';
import * as DateTime from './DateTime.js';
import * as Numbers from './Numbers.js';
import * as AllOf from './AllOf.js';
// export * as OneOf from './OneOf.js';
// export * as AnyOf from './AnyOf.js';
// export * as References from './References.js';
import * as Tests from './Tests.js';

const Blank = {
	schema: {} as JSONSchema7,
	ui: {},
	data: {},
} as const;

export const demoContent = {
	Sink: {
		AllFeatures,
		// Nullable,
		Arrays,
		Simple,
		Nested,
		DateTime,
		Numbers,
		// AllOf,
		Blank,
	},
	// Lab: { Tests },
} as const;

export type SectionName = keyof typeof demoContent;
// FIXME: sub-optimal
export type DemoName =
	| keyof (typeof demoContent)['Lab']
	| keyof (typeof demoContent)['Sink'];
export interface DemoContent {
	sectionName: SectionName;
	demoName: DemoName;
}
