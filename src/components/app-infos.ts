import { html } from 'lit';

export const appInfos = (dark = false) =>
	html`<div class="app-infos">
		<!-- <span>JSON Schema Form Element</span>
	<span>—</span> -->

		<a
			href="https://github.com/json-schema-form-element/jsfe"
			target="_blank"
			rel="noreferrer nofollow"
		>
			<img
				alt="Sources on GitHub"
				src="https://img.shields.io/badge/GH-%20Repository-${dark
					? '222?labelColor=111'
					: 'fff?labelColor=eee&logoColor=111'}&logo=github"
			/>
		</a>
		<a
			href="https://www.npmjs.com/package/@jsfe/form"
			target="_blank"
			rel="noreferrer nofollow"
		>
			<img
				alt="Published on NPM"
				src="https://img.shields.io/npm/v/@jsfe/form?color=${dark
					? '222&labelColor=111'
					: 'fff&labelColor=eee'}"
			/>
		</a>
		<a
			href="https://www.webcomponents.org/element/@jsfe/jsfe"
			target="_blank"
			rel="noreferrer nofollow"
		>
			<img
				alt="Published on webcomponents.org"
				src="https://img.shields.io/badge/webcomponents.org-${dark
					? '111'
					: 'eee'}.svg"
			/>
		</a>
		<div></div>
		<!-- 
	<a
		rel="noopener nofollow"
		target="_blank"
		href="https://github.com/json-schema-form-element/jsfe#readme"
		>Documentation</a
	>
	-
	<a
		rel="noopener nofollow"
		target="_blank"
		href="https://github.com/json-schema-form-element/jsfe"
		>Sources</a
	>
	(GitHub) -->
	</div>`;
