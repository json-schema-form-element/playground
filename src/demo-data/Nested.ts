/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

export const schema: JSONSchema7 = {
	title: 'To-do list',
	type: 'object',
	required: ['Title'],
	properties: {
		Title: {
			type: 'string',
			title: 'Task list title',
		},
		Tasks: {
			type: 'array',
			title: 'Tasks',
			items: {
				type: 'object',
				required: ['Title'],
				properties: {
					Title: {
						title: 'Title',
						description: 'A sample title',
						type: 'string',
					},
					Details: {
						title: 'Task details',
						description: 'Enter the task details',
						type: 'string',
					},
					Done: {
						title: 'Done?',
						default: false,
						type: 'boolean',
					},
				},
			},
		},
	},
};

export const ui = {};

export const data = {
	Title: 'My current tasks',
	Tasks: [
		{
			Title: 'My first task',
			Details:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			Done: true,
		},
		{
			Title: 'My second task',
			Details:
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
			Done: false,
		},
	],
};
