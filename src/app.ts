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
import highlightStyles from 'highlight.js/styles/an-old-hope.css?inline';

// -----------------------------------------------------------------------------

import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';

import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

// import '@shoelace-style/shoelace/dist/components/switch/switch.js';
// import '@shoelace-style/shoelace/dist/components/divider/divider.js';
// import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// -----------------------------------------------------------------------------

import appStyles from './app.scss?inline';

import * as demoContent from './demo-data/index.js';
// -----------------------------------------------------------------------------

import '@jsfe/core';
import type { UiSchema } from '@jsfe/core';

type DemoName = keyof typeof demoContent;

// import { shoelaceTags } from '../lib/components/shoelace/index.js';

hljs.registerLanguage('json', json);

setBasePath('/shoelace');

@customElement('playground-app')
export class PlaygroundApp extends LitElement {
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

	private _compactMode = false;

	firstUpdated() {
		// TODO: Responsiveness
		// const schemaNameFromUrl = window.location.pathname.substring(1);
		// if (schemaNameFromUrl in demoContent) {
		// 	this._selectedDemoName = schemaNameFromUrl as keyof typeof demoContent;
		// }
		// new ResizeObserver((entries) => {
		// 	Object.values(entries).forEach((entry) => {
		// 		// const needSwitch = entry.contentRect.width < 1220 !== this.compactMode;
		// 		// if (!needSwitch) return;
		// 		// this.compactMode = !this.compactMode;
		// 		// this.requestUpdate('compactMode');
		// 	});
		// }).observe(document.body);

		this.loadForm(this._selectedDemoName);
	}

	loadForm(demoName: DemoName) {
		this._selectedDemoName = demoName;
		this._currentData = demoContent[demoName].data;

		this._currentSchema = demoContent[demoName].schema;
		this._currentUiSchema = demoContent[demoName].ui;

		window.history.replaceState(null, '', this._selectedDemoName);
	}

	#debugPrinter = (tabKey: this['_tabs'][number]) => {
		const output = {
			Schema: this._currentSchema,
			'UI schema': this._currentUiSchema,
			Data: this._currentData,
		}[tabKey];
		const serialized = JSON.stringify(output, null, 2);
		const highlighted = hljs.highlight(serialized, { language: 'json' });

		return html`<pre class=${`debugger`}>
 ${unsafeHTML(highlighted.value)}</pre
		>`;
	};

	#assistant = (select: number) =>
		html`<sl-tab-group
			>${this._tabs.map(
				(tab, index) => html`
					<sl-tab .active=${select === index} slot="nav" panel=${tab}
						>${tab}</sl-tab
					>
					<sl-tab-panel name=${tab}>${this.#debugPrinter(tab)}</sl-tab-panel>
				`,
			)}
		</sl-tab-group>`;

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

	#form = () =>
		html`<json-schema-form
			exportparts="form-root"
			.schema=${this._currentSchema}
			.data=${this._currentData}
			.uiSchema=${this._currentUiSchema}
			.onDataChange=${(newData: unknown) => {
				console.log({ newData });
				this._currentData = newData;
			}}
			.onFormSubmit=${(newData: unknown, valid: boolean) => {
				// this.currentData = data;
				this.#alertRef.value!.toast().catch(() => null);
				console.log({ newData, valid });
			}}
			.experimental=${{
				allOf: true,
				oneOf: true,
			}}
		></json-schema-form>`;

	render() {
		return html`
			<div class="app" part="root">
				<div class="wrapper">
					<div class="demo-switcher">
						<sl-tab-group .placement=${this._compactMode ? 'top' : 'start'}>
							${this.#demoSwitcher()}

							<sl-tab-panel name="demo">
								<main>${this.#form()}<sl-divider></sl-divider></main>
							</sl-tab-panel>
						</sl-tab-group>
					</div>

					<aside>
						${'' /* this.#toolbar */}
						${'' /* <sl-divider hidden></sl-divider> */}
						<div class="assistants">
							<div slot="start" class="assistant top">
								${this.#assistant(0)}
							</div>
							<div slot="end" class="assistant bottom">
								${this.#assistant(1)}
							</div>
						</div>
					</aside>

					${this.#alertToaster}
				</div>

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

	static styles = [unsafeCSS(appStyles), unsafeCSS(highlightStyles)];
}

declare global {
	interface HTMLElementTagNameMap {
		'playground-app': PlaygroundApp;
	}
}
