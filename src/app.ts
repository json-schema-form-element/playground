/* eslint-disable no-underscore-dangle */
/* eslint-disable max-lines */
import { LitElement, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, state } from 'lit/decorators.js';

// -----------------------------------------------------------------------------
// import { bundle as $refBundler } from '@apidevtools/json-schema-ref-parser';

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

// -----------------------------------------------------------------------------
import Split from 'split.js';

import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';

import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

// import '@shoelace-style/shoelace/dist/components/switch/switch.js';
// import '@shoelace-style/shoelace/dist/components/divider/divider.js';
// import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// -----------------------------------------------------------------------------

import appStyles from './app.scss?inline';
import * as demoContent from './demo-data/index.js';

// -----------------------------------------------------------------------------

// import '@jsfe/core';
// eslint-disable-next-line import/no-relative-packages
import '../../core/lib/json-schema-form.js';
// eslint-disable-next-line import/no-relative-packages
import '../../core/lib/styles.scss';

import type { Jsf, Path, UiSchema } from '@jsfe/core';
import { findJsonPathLocation } from './utils/code.js';
import { classMap } from 'lit/directives/class-map.js';
import SlDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.js';

type DemoName = keyof typeof demoContent;

// import { shoelaceTags } from '../lib/components/shoelace/index.js';

hljs.registerLanguage('json', json);

setBasePath('/shoelace');

@customElement('jsfe-playground')
export class JsfePlayground extends LitElement {
	@state() private _selectedDemoName: DemoName = 'AllFeatures';

	@state() private _currentSchema = {};

	@state() private _currentData: unknown =
		demoContent[this._selectedDemoName].data;

	@state() private _currentUiSchema: UiSchema =
		demoContent[this._selectedDemoName].ui;

	#alertRef = createRef<SlAlert>();

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
		this.loadForm(this._selectedDemoName);

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

	// eslint-disable-next-line class-methods-use-this
	#bindThemeSwitcher() {
		function switchTheme(matches: MediaQueryListEvent['matches']) {
			const newColorScheme = matches ? 'dark' : 'light';
			if (newColorScheme === 'dark') {
				document.documentElement.classList.remove('sl-theme-light');
				document.documentElement.classList.add('sl-theme-dark');
			} else {
				document.documentElement.classList.add('sl-theme-light');
				document.documentElement.classList.remove('sl-theme-dark');
			}
		}
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
			{
				...common,
			},
		);
	}

	loadForm(demoName: DemoName) {
		this._selectedDemoName = demoName;
		this._currentData = demoContent[demoName].data;

		this._currentSchema = demoContent[demoName].schema;
		this._currentUiSchema = demoContent[demoName].ui;

		window.history.replaceState(null, '', this._selectedDemoName);
	}

	#debugPrinter = (tabKey: this['_tabs'][number], focusable = false) => {
		const outputType = {
			Data: [this._currentData, this._activeDataLine, this.#scrollableDataRef],
			Schema: [
				this._currentSchema,
				this._activeSchemaLine,
				this.#scrollableSchemaRef,
			],
			'UI schema': [
				this._currentUiSchema,
				this._activeUiSchemaLine,
				this.#scrollableUiSchemaRef,
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

	// TODO: Move to settings
	// #assistant = (select: number) =>
	// 	html`<sl-tab-group
	// 		>${this._tabs.map(
	// 			(tab, index) => html`
	// 				<sl-tab .active=${select === index} slot="nav" panel=${tab}
	// 					>${tab}</sl-tab
	// 				>
	// 				<sl-tab-panel name=${tab}
	// 					>${this.#debugPrinter(tab, index === 0)}</sl-tab-panel
	// 				>
	// 			`,
	// 		)}
	// 	</sl-tab-group>`;

	#demoSwitcher = () =>
		Object.entries(demoContent).map(
			([demoName]) =>
				html`<sl-tab
					slot="nav"
					panel="demo"
					.active=${this._selectedDemoName === demoName}
					@click=${() => this.loadForm(demoName as DemoName)}
				>
					<span>${demoName}</span>&nbsp;
					${'experimental' in demoContent[demoName as keyof typeof demoContent]
						? html`<sl-icon name="cone-striped"></sl-icon>`
						: ''}</sl-tab
				>`,
		);

	// #toolbar = html`<div class="toolbar">
	// 	<sl-select label="UI elements" value="shoelace">
	// 		<sl-option value="shoelace">Shoelace</sl-option>
	// 		<sl-option value="system" disabled>System</sl-option>
	// 	</sl-select>

	// 	<sl-divider vertical></sl-divider>

	// 	<sl-switch
	// 		.checked=${this.debugForm}
	// 		@sl-change=${() => {
	// 			this.debugForm = !this.debugForm;
	// 			// this.#jsf().debug(this.debugForm);
	// 		}}
	// 		>Debug raw output</sl-switch
	// 	>
	// </div>`;

	#alertToaster = html`<sl-alert
		variant="primary"
		duration="3000"
		closable
		${ref(this.#alertRef)}
	>
		<sl-icon slot="icon" name="info-circle"></sl-icon>
		<strong>Your submission status</strong><br />
		Valid! You can keep going on…
	</sl-alert>`;

	@state() private _activeDataLine: undefined | number;

	#scrollableDataRef = createRef<HTMLElement>();

	@state() private _activeSchemaLine: undefined | number;

	#scrollableSchemaRef = createRef<HTMLElement>();

	@state() private _activeUiSchemaLine: undefined | number;

	#scrollableUiSchemaRef = createRef<HTMLElement>();

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

		/// / TODO: Should move this in a properly deferred function (after Lit render)
		/// / Use an observable property for each scrollable part
		setTimeout(() => {
			scroll(this.#scrollableDataRef.value!, this._activeDataLine);
			scroll(this.#scrollableSchemaRef.value!, this._activeSchemaLine);
			scroll(this.#scrollableUiSchemaRef.value!, this._activeUiSchemaLine);
		});
	};

	#form = () =>
		html`<json-schema-form
			exportparts="form-root"
			.schema=${this._currentSchema}
			.data=${this._currentData}
			.uiSchema=${this._currentUiSchema}
			.onDataChange=${this.#handleDataChange}
			.onFormSubmit=${(newData: unknown, valid: boolean) => {
				// this.currentData = data;
				this.#alertRef.value!.toast().catch(() => null);
				console.info({ newData, valid });
			}}
			.experimental=${{
				allOf: true,
				oneOf: true,
			}}
		></json-schema-form>`;

	#splitRefs = {
		top: createRef<HTMLElement>(),
		bottom: createRef<HTMLElement>(),

		topLeft: createRef<HTMLElement>(),
		topRight: createRef<HTMLElement>(),

		bottomLeft: createRef<HTMLElement>(),
		bottomRight: createRef<HTMLElement>(),
	};

	/* prettier-ignore */
	#colors = [
		'Gray', 'Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green', 'Emerald',
		'Teal', 'Cyan', 'Sky', 'Blue', 'Indigo', 'Violet', 'Purple', 'Fuchsia',
		'Pink', 'Rose'
	];

	#settings = () => html`
		<div class="settings">
			<sl-select
				value="Sky"
				label="Accent color"
				@sl-change=${(event: Event) => {
					const color = (event.target as HTMLInputElement).value;
					document.documentElement.dataset.themeAccent = color.toLowerCase();
				}}
			>
				<div
					class="palette"
					slot="prefix"
					style="--color: var(--sl-color-primary-500)"
				></div>
				<!-- <sl-icon slot="suffix" name="telephone"></sl-icon> -->

				${this.#colors.map(
					(color) =>
						html`<sl-option value=${color}>
							<div
								class="palette"
								slot="prefix"
								style="--color: var(--sl-color-${color.toLowerCase()}-500)"
							></div>
							${color}
							<div class="type" slot="suffix">
								${color === 'Sky' ? '(default)' : ''}
							</div>
						</sl-option>`,
				)}
			</sl-select>
		</div>
	`;

	#assistantsDrawer = createRef<SlDrawer>();

	#assistants = () =>
		html`<aside>
			${'' /* this.#toolbar */} ${'' /* <sl-divider hidden></sl-divider> */}
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
		return html`
			<div class="app">
				<!-- ${this._compactMode} -->
				<div class="wrapper">
					<div class="demo-switcher">
						<sl-tab-group .placement=${this._compactMode ? 'top' : 'start'}>
							${this.#demoSwitcher()}

							<sl-tab-panel name="demo">
								<main>${this.#form()}</main>
							</sl-tab-panel>
						</sl-tab-group>
						<!-- <sl-divider></sl-divider> -->
					</div>

					${
						// TODO:
						// this._compactMode
						// 	? html`<sl-button
						// 				@click=${() => {
						// 					this.#assistantsDrawer.value!.show().catch(() => null);
						// 				}}
						// 				>Open Drawer</sl-button
						// 			>
						// 			<sl-drawer
						// 				label="Drawer"
						// 				class="drawer-overview"
						// 				${ref(this.#assistantsDrawer)}
						// 			>
						// 				${this.#assistants()}
						// 				<sl-button
						// 					slot="footer"
						// 					variant="primary"
						// 					@click=${() => {
						// 						this.#assistantsDrawer.value!.hide().catch(() => null);

						// 						this.requestUpdate();
						// 					}}
						// 					>Close</sl-button
						// 				></sl-drawer
						// 			>`
						// 	: this.#assistants()
						''
					}
					 ${this.#assistants()}
					</sl-drawer>
				</div>

				${this.#alertToaster}

				<footer class="main">
					<div>
						<span
							>JSON Schema Form Element (<em>alpha version</em>) - Web
							Component</span
						>
						—
						<a
							rel="noopener nofollow"
							target="_blank"
							href="https://github.com/json-schema-form-element/core#readme"
							>Documentation</a
						>
						-
						<a
							rel="noopener nofollow"
							target="_blank"
							href="https://github.com/json-schema-form-element/core"
							>Sources</a
						>
						(GitHub)
					</div>
				</footer>
			</div>
		`;
	}

	static styles = [unsafeCSS(appStyles)];
}

declare global {
	interface HTMLElementTagNameMap {
		'jsfe-playground': JsfePlayground;
	}
}
