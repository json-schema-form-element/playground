import type { JSONSchema7 } from 'json-schema';

export * as AllFeatures from './AllFeatures.js';
export * as Nullable from './Nullable.js';
export * as Arrays from './Arrays.js';
export * as Simple from './Simple.js';
export * as Nested from './Nested.js';
export * as DateTime from './DateTime.js';
export * as Numbers from './Numbers.js';
export * as AllOf from './AllOf.js';
// export * as OneOf from './OneOf.js';
// export * as AnyOf from './AnyOf.js';
// export * as References from './References.js';

export const Blank = {
	schema: {} as JSONSchema7,
	ui: {},
	data: {},
};
