/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/form';

// import '@vaadin/rich-text-editor';
// import '@vaadin/rich-text-editor/theme/material/vaadin-rich-text-editor.js';
// import '@vaadin/rich-text-editor/theme/lumo/vaadin-rich-text-editor.js';

import type { RichTextEditorValueChangedEvent } from '@vaadin/rich-text-editor';

import('@vaadin/rich-text-editor/theme/lumo/vaadin-rich-text-editor.js').catch(
	() => null,
);
// import '@vaadin/rich-text-editor/src/vaadin-rich-text-editor.js';

export const myCustomWidgetRte: Widgets['text'] = (options) => html`
	<div class="custom-widget-rte" id=${options.id} theme="dark">
		<div>
			<label>${options.label}</label>
			<!-- <p>${options.helpText}</p> -->
		</div>

		<!-- value=${options.value} -->
		<vaadin-rich-text-editor
			@html-value-changed=${(event: RichTextEditorValueChangedEvent) => {
				const value = event.detail.value;
				options.valueChangedCallback?.(value);
			}}
		></vaadin-rich-text-editor>
	</div>

	<style>
		vaadin-rich-text-editor {
			--lumo-primary-color: var(--sl-color-primary-500);
			--lumo-base-color: var(--sl-color-neutral-50);
			--lumo-contrast-5pct: var(--sl-color-neutral-100);
			--lumo-contrast-80pct: var(--sl-color-neutral-900);
			--lumo-contrast-60pct: var(--sl-color-neutral-700);
		}

		.custom-widget-rte label {
			display: block;
			margin: 1rem;
		}
	</style>
`;

export const myCustomWidgetBigButton: Widgets['text'] = (options) => html`
	<div class="custom-widget-big-button" id=${options.id}>
		<button
			type="button"
			@click=${() => {
				options.valueChangedCallback?.(crypto.randomUUID());
			}}
		>
			${options.label}
		</button>

		<p>${options.helpText}</p>
		<code>${options.value || options.placeholder}</code>
	</div>

	<!-- From: https://codepen.io/rahulp7529/pen/abPMbgG -->
	<style>
		.custom-widget-big-button {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin: 3rem;
		}

		.custom-widget-big-button code {
			text-align: center;
		}
		.custom-widget-big-button details {
			margin-top: 3rem;
			cursor: pointer;
		}

		.custom-widget-big-button button {
			--c: var(--sl-color-neutral-900); /* text color */

			/* transition: background var(--sl---sl-transition-x-slow); */

			background: linear-gradient(
				90deg,
				var(--sl-color-primary-50) 0%,
				var(--sl-color-primary-300) 47%,
				var(--sl-color-primary-50) 100%
			);
			border-radius: 50px;
			color: #0000;
			border: none;
			transform: perspective(500px) rotateY(calc(20deg * var(--_i, -1)));
			text-shadow:
				calc(var(--_i, -1) * 0.08em) -0.01em 0 var(--c),
				calc(var(--_i, -1) * -0.08em) 0.01em 2px #0004;
			outline-offset: 0.1em;
			transition: 0.3s;

			box-shadow: 0 0.3rem 1rem #0005;
		}
		.custom-widget-big-button button:hover,
		.custom-widget-big-button button:focus-visible {
			--_p: 0%;
			--_i: 1;
		}
		.custom-widget-big-button button:active {
			text-shadow: none;
			color: var(--c);
			box-shadow: inset 0 0 9e9Q #0005;
			transition: 0s;
		}

		.custom-widget-big-button button {
			/* width: 10rem; */
			font-family: system-ui, sans-serif;
			font-weight: bold;
			font-size: 2.5rem;
			margin: 0;
			cursor: pointer;
			padding: 0.1em 0.3em;
		}
	</style>
`;

export const myCustomWidgetSignature: Widgets['text'] = (options) => html`
	<my-custom-widget-signature
		id=${options.id}
		class="custom-widget-signature"
		.handleOk=${options.valueChangedCallback}
	>
		<div>
			<label>${options.label}</label>
			<p>${options.helpText}</p>
		</div>
		<div class="input">
			<canvas width="250" height="250"></canvas>

			<button type="button">OK!!</button>

			${options.value
				? html`<article>
						<div>🙌 Very nice!</div>
						<img width="150" height="150" .src=${options.value} />
				  </article>`
				: nothing}
		</div>
	</my-custom-widget-signature>
	<style>
		my-custom-widget-signature label {
			font-size: var(--sl-font-size-large);
		}

		my-custom-widget-signature button {
			/* button: add; */
			padding: 1rem;
		}
		my-custom-widget-signature {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 1rem;
			gap: 2rem;
		}

		my-custom-widget-signature .input,
		my-custom-widget-signature article {
			display: flex;
			gap: 1rem;
			flex-direction: column;
		}

		my-custom-widget-signature article {
		}

		my-custom-widget-signature canvas {
			border: 1px solid var(--sl-color-primary-200);
		}
	</style>
`;
customElements.define(
	'my-custom-widget-signature',
	class extends HTMLElement {
		public handleOk?: (v?: string) => void;

		#image = '';

		_handleOk() {
			this.handleOk?.(this.#image);

			const canvas = this.querySelector('canvas')!;
			const context = canvas.getContext('2d')!;
			context.clearRect(0, 0, canvas.width, canvas.height);

			this.#image = '';
		}

		_handleHover(e: MouseEvent) {
			const canvas = this.querySelector('canvas')!;
			const context = canvas.getContext('2d')!;

			const rect = canvas.getBoundingClientRect();
			const pos = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};

			context.beginPath();
			context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);

			context.fillStyle = 'gray';
			context.fill();

			this.#image = canvas.toDataURL();
		}

		connectedCallback() {
			this.querySelector('canvas')?.addEventListener(
				'mousemove',
				this._handleHover.bind(this),
			);
			this.querySelector('button')?.addEventListener(
				'click',
				this._handleOk.bind(this).bind(this),
			);
		}

		disconnectedCallback() {
			this.querySelector('canvas')?.removeEventListener(
				'mousemove',
				this._handleHover.bind(this),
			);
			this.querySelector('button')?.removeEventListener(
				'click',
				this._handleOk.bind(this).bind(this),
			);
		}
	},
);
