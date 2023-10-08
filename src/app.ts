/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines */
import { LitElement, html, nothing, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, state } from 'lit/decorators.js';

import addFormats from 'ajv-formats';
import Ajv, { type ErrorObject as AjvErrorObject } from 'ajv';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

import Split from 'split.js';

import type { SlSelectionChangeEvent } from '@shoelace-style/shoelace';
import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import type SlTree from '@shoelace-style/shoelace/dist/components/tree/tree.js';

import {
	themeFromSourceColor,
	applyTheme,
} from '@material/material-color-utilities';

// -----------------------------------------------------------------------------

import '@j_c/jsfe__form';
import type { Jsf, Path, UiSchema, Theme, Widgets } from '@j_c/jsfe__form';

// -----------------------------------------------------------------------------

import appStyles from './app.scss?inline';

import * as demoContent from './demo-data/index.js';
import * as themes from './themes.js';

import { findJsonPathLocation } from './utils/code.js';
import { hslToArgb } from './utils/color.js';

import { footer } from './components/footer.js';

// -----------------------------------------------------------------------------

type SectionName = keyof typeof demoContent;
type DemoName = keyof (typeof demoContent)[SectionName];

// -----------------------------------------------------------------------------

hljs.registerLanguage('json', json);

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

// -----------------------------------------------------------------------------

@customElement('jsfe-playground')
export class JsfePlayground extends LitElement {
	@state() private _selectedSectionName: SectionName = 'Rjsf';

	@state() private _selectedDemoName: DemoName = 'AllFeatures';

	@state() private _currentSchema = {};

	@state() private _currentData: unknown =
		demoContent[this._selectedSectionName][this._selectedDemoName].data;

	@state() private _currentUiSchema: UiSchema =
		demoContent[this._selectedSectionName][this._selectedDemoName].ui;

	#toasterRef = createRef<SlAlert>();

	@state() private _colorScheme: 'light' | 'dark' = 'dark';

	@state() private _widgets: Partial<Record<Theme, Widgets>> = themes.widgets;

	@state() private _selectedTheme: Theme = 'shoelace';

	_tabs = [
		//
		'Data',
		'Schema',
		'UI schema',
	] as const;

	@state() private _compactMode = false;

	firstUpdated() {
		this.#bindThemeSwitcher();

		this.#bindResponsive();

		this.#loadCurrentUrl();
		this.loadForm(this._selectedSectionName, this._selectedDemoName);

		this.#splitPanes();
	}

	#loadCurrentUrl() {
		const schemaNameFromUrl = window.location.pathname.substring(1);
		if (schemaNameFromUrl in demoContent) {
			this._selectedDemoName = schemaNameFromUrl as keyof typeof demoContent;
		}
	}

	#bindResponsive() {
		new ResizeObserver((entries) => {
			Object.values(entries).forEach((entry) => {
				const needSwitch = entry.contentRect.width < 1279 !== this._compactMode;
				if (!needSwitch) return;
				this._compactMode = !this._compactMode;
			});
		}).observe(document.body);
	}

	_currentAccentColor = 'sky';

	_switchAccentColor(color: string) {
		// Shoelace
		document.documentElement.dataset.themeAccent = color;

		this._currentAccentColor = color;
		this._applyMwcColor();
	}

	_toggleColorScheme() {
		this._colorScheme = this._colorScheme === 'dark' ? 'light' : 'dark';

		document.documentElement.classList.toggle('sl-theme-dark');
		document.documentElement.classList.toggle('cds-theme-dark');
		document.documentElement.classList.toggle('sl-theme-light');
		document.documentElement.classList.toggle('cds-theme-light');

		this._applyMwcColor();
	}

	_applyMwcColor() {
		const argb = hslToArgb(themes.slColorToMwc[this._currentAccentColor]);

		const theme = themeFromSourceColor(argb, [
			// { name: 'custom-1', value: argbFromHex('#ff0000'), blend: true },
		]);
		applyTheme(theme, {
			target: document.body,
			dark: this._colorScheme === 'dark',
		});
	}

	// eslint-disable-next-line class-methods-use-this
	#bindThemeSwitcher() {
		const switchTheme = (matches: MediaQueryListEvent['matches']) => {
			const newColorScheme = matches ? 'dark' : 'light';

			if (newColorScheme === 'dark') {
				this._colorScheme = 'dark';
				document.documentElement.classList.remove('sl-theme-light');
				document.documentElement.classList.add('sl-theme-dark');
				document.documentElement.classList.remove('cds-theme-light');
				document.documentElement.classList.add('cds-theme-dark');
			} else {
				this._colorScheme = 'light';
				document.documentElement.classList.add('sl-theme-light');
				document.documentElement.classList.remove('sl-theme-dark');
				document.documentElement.classList.add('cds-theme-light');
				document.documentElement.classList.remove('cds-theme-dark');
			}
			this._applyMwcColor();
		};

		const query = window.matchMedia('(prefers-color-scheme: dark)');

		switchTheme(query.matches);
		query.addEventListener('change', (event) => {
			switchTheme(event.matches);
		});
	}

	#splitPanes() {
		const common = { gutterSize: 9, minSize: 50, snapOffset: 20 };
		Split([this.#splitRefs.top.value!, this.#splitRefs.bottom.value!], {
			direction: 'vertical',
			...common,
			sizes: [60, 40],
		});
		Split([this.#splitRefs.topLeft.value!, this.#splitRefs.topRight.value!], {
			...common,
		});
		Split(
			[this.#splitRefs.bottomLeft.value!, this.#splitRefs.bottomRight.value!],
			{ ...common },
		);
	}

	loadForm(sectionName: SectionName, demoName: DemoName) {
		this._selectedDemoName = demoName;
		this._currentData = demoContent[sectionName][demoName].data;

		this._currentSchema = demoContent[sectionName][demoName].schema;
		this._currentUiSchema = demoContent[sectionName][demoName].ui;

		// window.history.replaceState(null, '', this._selectedDemoName);
	}

	#scrollableRefs = {
		data: createRef<HTMLElement>(),
		schema: createRef<HTMLElement>(),
		uiSchema: createRef<HTMLElement>(),
	};

	#splitRefs = {
		top: createRef<HTMLElement>(),
		bottom: createRef<HTMLElement>(),

		topLeft: createRef<HTMLElement>(),
		topRight: createRef<HTMLElement>(),

		bottomLeft: createRef<HTMLElement>(),
		bottomRight: createRef<HTMLElement>(),
	};

	@state() private _activeDataLine: undefined | number;

	@state() private _activeSchemaLine: undefined | number;

	@state() private _activeUiSchemaLine: undefined | number;

	@state() private _currentPath: Partial<Record<this['_tabs'][number], Path>> =
		{};

	#handleDataChange: Jsf['onDataChange'] = (
		newData: unknown,
		path: Path,
		value: unknown,
		schemaPath: Path,
	) => {
		console.info({ newData, path, value, schemaPath });
		this._currentData = newData;

		const dataLoc = findJsonPathLocation(newData, path);
		this._activeDataLine = dataLoc?.start.line;
		// console.log({ dataLocation: dataLoc, path });
		const schemaLoc = findJsonPathLocation(this._currentSchema, schemaPath);
		// console.log({ schemaLocation: schemaLoc, path });
		this._activeSchemaLine = schemaLoc?.start.line;
		const uiSchemaLoc = findJsonPathLocation(this._currentUiSchema, path);
		// console.log({ uiSchemaLocation: uiSchemaLoc, path });
		this._activeUiSchemaLine = uiSchemaLoc?.start.line;

		this._currentPath = {
			Data: this._activeDataLine ? path : undefined,
			Schema: this._activeSchemaLine ? schemaPath : undefined,
			'UI schema': this._activeUiSchemaLine ? path : undefined,
		};

		function scroll(element: HTMLElement, line?: number) {
			if (!line) return;
			const lnWrapper = element?.querySelector('.line-numbers');
			const lineElement = lnWrapper?.children?.[line];

			lineElement?.scrollIntoView({ block: 'center', inline: 'center' });
		}

		// TODO: Should move this in a properly deferred function (after Lit render)
		// Use an observable property for each scrollable part
		setTimeout(() => {
			scroll(this.#scrollableRefs.data.value!, this._activeDataLine);
			scroll(this.#scrollableRefs.schema.value!, this._activeSchemaLine);
			scroll(this.#scrollableRefs.uiSchema.value!, this._activeUiSchemaLine);
		});
	};

	#ajvInstance = ajv;

	@state() private _errors: AjvErrorObject[] = [];

	#validateData(newData: unknown) {
		const validate = this.#ajvInstance.compile(this._currentSchema);

		validate(newData);

		if (validate.errors?.length) {
			console.error({ AjvErrors: validate.errors });
			this._errors = validate.errors;
		} else this._errors = [];
	}

	#debugPrinter = (tabKey: this['_tabs'][number], focusable = false) => {
		const outputType = {
			Data: [
				this._currentData,
				this._activeDataLine,
				this.#scrollableRefs.data,
			],
			Schema: [
				this._currentSchema,
				this._activeSchemaLine,
				this.#scrollableRefs.schema,
			],
			'UI schema': [
				this._currentUiSchema,
				this._activeUiSchemaLine,
				this.#scrollableRefs.uiSchema,
			],
		} as const;
		const output = outputType[tabKey];
		const serialized = JSON.stringify(output[0], null, 2);
		const highlighted = hljs.highlight(serialized, { language: 'json' });

		const lineCount = serialized.split('\n').length;

		return html`
			<div class="debugger-wrapper">
				<header>
					${/* tabKey */ ''}
					<!-- <div class="title">${tabKey}</div> -->
					<sl-breadcrumb>
						${[tabKey, ...(this._currentPath?.[tabKey] || [])]?.map(
							(part) => html`<sl-breadcrumb-item>${part}</sl-breadcrumb-item> `,
						)}
					</sl-breadcrumb>
				</header>

				<article class=${`debugger`} ${ref(output[2])}>
					<div class="line-highlight">
						${new Array(lineCount).fill(null).map(
							(_, i) => html`
								<div
									class=${classMap({
										changed: focusable && output[1] === i + 1,
									})}
								>
									&nbsp;
								</div>
							`,
						)}
					</div>
					<div class="line-numbers">
						${new Array(lineCount).fill(null).map(
							(_, i) => html`
								<div
									class=${classMap({
										changed: focusable && output[1] === i + 1,
									})}
								>
									${i + 1}
								</div>
							`,
						)}
					</div>
					<pre>
${unsafeHTML(`${highlighted.value}\n ` /* Forcefinal line */)}</pre
					>
				</article>
			</div>
		`;
	};

	#settings = () => html`
		<div class="settings-list">
			<sl-radio-group
				.value=${themes.libraries[0][0]}
				label="Component libraries"
				@sl-change=${(event: Event) => {
					const ui = (event.target as HTMLInputElement).value;
					themes.libraries.forEach(([lib]) => {
						if (ui === lib) this._selectedTheme = ui;
					});
				}}
			>
				${themes.libraries.map(
					([v, library]) => html`<sl-radio value=${v}>${library}</sl-radio>`,
				)}
			</sl-radio-group>

			<sl-switch
				@sl-change=${() => {
					this._toggleColorScheme();
				}}
				>Light / Dark scheme</sl-switch
			>

			<sl-select
				value="Sky"
				label="Accent color"
				@sl-change=${(event: Event) => {
					const color = (event.target as HTMLInputElement).value;
					this._switchAccentColor(color.toLowerCase());
				}}
			>
				<div
					class="palette"
					slot="prefix"
					style="--color: var(--sl-color-primary-500)"
				></div>

				${themes.colors.map(
					(color) =>
						html`<sl-option value=${color}>
							<div
								class="palette"
								slot="prefix"
								style="--color: var(--sl-color-${color.toLowerCase()}-500)"
							></div>
							<span
								>${color} ${color === 'Sky' ? '(default)' : ''}
								<!-- FIXME: (weird layout) -->
							</span>
							<!-- <div class="type" slot="suffix"></div> -->
						</sl-option>`,
				)}
			</sl-select>
		</div>
	`;

	#tree = () =>
		html` <!--  -->
			<sl-tree
				class="assets-tree"
				@sl-selection-change=${(event: Event) => {
					const selection = (event as SlSelectionChangeEvent).detail.selection;

					console.log((event.target as SlTree).selection);
					selection.forEach((e) => {
						console.log(e.dataset.demoName);
						const { demoName, sectionName } = e.dataset;
						if (
							sectionName &&
							demoName &&
							sectionName in demoContent &&
							demoName in demoContent[this._selectedSectionName]
						) {
							// this._selectedDemoName = e.dataset.demoName as DemoName;
							this.loadForm('Rjsf', demoName as DemoName);
						}
					});
				}}
			>
				${Object.entries(demoContent)
					.sort(([a], [b]) => (a > b ? 1 : -1))
					.map(
						// slot="nav"
						// panel="demo"
						// .active=${this._selectedDemoName === demoName}
						// @click=${() => this.loadForm(demoName as DemoName)}
						([sectionName, section]) =>
							html`<sl-tree-item expanded .selectable?=${false}>
								<sl-icon name="folder"></sl-icon>
								${sectionName}
								${Object.entries(section)
									.sort(([a], [b]) => (a > b ? 1 : -1))
									.map(
										// slot="nav"
										// panel="demo"
										// .active=${this._selectedDemoName === demoName}
										// @click=${() => this.loadForm(demoName as DemoName)}
										([demoName]) =>
											html`<sl-tree-item
												.selected=${demoName === this._selectedDemoName}
												@sl-lazy-load=${(event) => {
													console.log(event);
												}}
												data-section-name=${sectionName}
												data-demo-name=${demoName}
											>
												${demoName}&nbsp;
												${'experimental' in
												demoContent[sectionName as SectionName][
													demoName as DemoName
												]
													? html`<sl-icon name="cone-striped"></sl-icon>`
													: ''}
											</sl-tree-item>`,
									)}</sl-tree-item
							>`,
					)}
			</sl-tree>`;

	#form = () =>
		html`<json-schema-form
			.styleSheets=${themes.styleSheets}
			.widgets=${this._widgets[this._selectedTheme]}
			.schema=${this._currentSchema}
			.data=${this._currentData}
			.uiSchema=${this._currentUiSchema}
			.onDataChange=${this.#handleDataChange}
			.submitCallback=${(newData: unknown, valid: boolean) => {
				// this.currentData = data;
				console.info({ newData, valid });

				this.#validateData(newData);

				this.#toasterRef.value!.toast().catch(() => null);
			}}
			.experimental=${{
				allOf: true,
				oneOf: true,
			}}
		></json-schema-form>`;

	#assistants = () =>
		html` <!--  -->
			<aside>
				<div class="assistants">
					<div
						${ref(this.#splitRefs.top)}
						class="assistant top split split-horizontal"
					>
						<section
							${ref(this.#splitRefs.topLeft)}
							class="assistant top-left data split"
						>
							${this.#debugPrinter('Data', true)}
						</section>

						<section
							${ref(this.#splitRefs.topRight)}
							class="assistant top-right schema split"
						>
							${this.#debugPrinter('Schema', true)}
						</section>
					</div>
					<div
						${ref(this.#splitRefs.bottom)}
						class="assistant bottom split split-horizontal"
					>
						<section
							${ref(this.#splitRefs.bottomLeft)}
							class="assistant bottom-left ui split"
						>
							${this.#debugPrinter('UI schema', true)}
						</section>

						<section
							${ref(this.#splitRefs.bottomRight)}
							class="assistant bottom-right settings split"
						>
							<h3 class="title">Settings</h3>
							${this.#settings()}
						</section>
					</div>
				</div>
			</aside>`;

	render() {
		return html` <div class="app">
			<!-- $ {this._compactMode} -->
			<div class="wrapper">
				<div class="demo-switcher">
					${this.#tree()}
					<main>${this.#form()}</main>
				</div>

				${this.#assistants()}
			</div>

			${this.#alertToaster()}
			<!--  -->
			${footer}
		</div>`;
	}

	#alertToaster = () => {
		const hasErrors = this._errors.length;
		return html`<sl-alert
			.variant=${hasErrors ? 'danger' : 'success'}
			.duration=${hasErrors ? 8000 : 3000}
			closable
			${ref(this.#toasterRef)}
		>
			<!-- info-circle -->
			<sl-icon
				slot="icon"
				.name=${hasErrors ? 'x-circle' : 'check-all'}
			></sl-icon>
			<strong>Your submission status</strong><br />
			${hasErrors
				? html`
						Incorrect form 🫤…
						<ul>
							${this._errors.map((error) => {
								return html`
									<li>${error.instancePath} - ${error.message}</li>
								`;
							})}
						</ul>
				  `
				: 'Valid! You can keep going on…'}
		</sl-alert>`;
	};

	static styles = [unsafeCSS(appStyles)];
}

declare global {
	interface HTMLElementTagNameMap {
		'jsfe-playground': JsfePlayground;
	}
}
