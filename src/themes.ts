/* eslint-disable import/no-duplicates */
/* eslint-disable import/first */

/* prettier-ignore */
export const colors = [
		'Gray', 'Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Emerald',
		'Teal', 'Cyan', 'Sky', 'Blue', 'Indigo', 'Violet', 'Purple', 'Fuchsia',
		'Pink', 'Rose'
	];

export const libraries = [
	['shoelace', 'Shoelace'],
	['material', 'Material'],
	['carbon', 'Carbon'],
	['wired', 'Wired'],
	['spectrum', 'Spectrum'],
	['system', 'System'],
] as const;

export type Theme = (typeof libraries)[number][0];

export const slColorToMwc = {
	gray: [240, 3.8, 46.1],
	red: [0, 84.2, 60.2],
	orange: [24.6, 95, 53.1],
	amber: [37.7, 92.1, 50.2],
	yellow: [45.4, 93.4, 47.5],
	lime: [83.7, 80.5, 44.3],
	green: [142.1, 70.6, 45.3],
	emerald: [160.1, 84.1, 39.4],
	teal: [173.4, 80.4, 40],
	cyan: [188.7, 94.5, 42.7],
	sky: [198.6, 88.7, 48.4],
	blue: [217.2, 91.2, 59.8],
	indigo: [238.7, 83.5, 66.7],
	violet: [258.3, 89.5, 66.3],
	purple: [270.7, 91, 65.1],
	fuchsia: [292.2, 84.1, 60.6],
	pink: [330.4, 81.2, 60.4],
	rose: [349.7, 89.2, 60.2],
};

// ----

import { widgets as shoelaceWidgets } from '@jsfe/shoelace';
import { widgets as spectrumWidgets } from '@jsfe/spectrum';
import { widgets as materialWidgets } from '@jsfe/material';
import { widgets as wiredWidgets } from '@jsfe/wired';
import { widgets as carbonWidgets } from '@jsfe/carbon';
import { widgets as systemWidgets } from '@jsfe/system';
import * as customWidgets from './demo-data/custom-widgets';

export const widgets = {
	shoelace: { ...shoelaceWidgets, ...customWidgets },
	spectrum: { ...spectrumWidgets, ...customWidgets },
	material: { ...materialWidgets, ...customWidgets },
	wired: { ...wiredWidgets, ...customWidgets },
	carbon: { ...carbonWidgets, ...customWidgets },
	system: { ...systemWidgets, ...customWidgets },
};

// import { styles as jsfeStyles } from '@jsfe/form/jss';
import { styles as jsfeShoelaceStyles } from '@jsfe/shoelace/jss';
import { styles as jsfeSpectrumStyles } from '@jsfe/spectrum/jss';
import { styles as jsfeMaterialStyles } from '@jsfe/material/jss';
import { styles as jsfeWiredStyles } from '@jsfe/wired/jss';
import { styles as jsfeCarbonStyles } from '@jsfe/carbon/jss';
import { styles as jsfeSystemStyles } from '@jsfe/system/jss';

export const styleSheets = [
	// jsfeStyles,
	jsfeShoelaceStyles,
	jsfeSpectrumStyles,
	jsfeMaterialStyles,
	jsfeWiredStyles,
	jsfeCarbonStyles,
	jsfeSystemStyles,
];

// ---- App - VENDOR

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

// import '@shoelace-style/shoelace/dist/components/switch/switch.js';
// import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
// import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
// import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('/shoelace');

// Spectrum

// import '@spectrum-web-components/bundle/elements.js';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-dark.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-large.js';

//

// import '@spectrum-web-components/theme/scale-medium.js';
// import '@spectrum-web-components/theme/src/themes.js';

// import '@spectrum-web-components/icon/sp-icon.js';
// import '@spectrum-web-components/icons/sp-icons-large.js';
// import '@spectrum-web-components/icons/sp-icons-medium.js';
