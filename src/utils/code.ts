import {
	parse,
	type DocumentNode,
	ValueNode,
	MemberNode,
	ElementNode,
} from '@humanwhocodes/momoa';
import type { Path } from '@jsfe/form';

type Location = MemberNode['loc'];

function walk(
	ast: DocumentNode | ValueNode | MemberNode | ElementNode,
	path: Path,
	callback: (location: Location) => void,
) {
	if (ast.type === 'Document') {
		walk(ast.body, path, callback);
	}
	if (ast.type === 'Object') {
		ast.members.forEach((member) => {
			if (member.name.value === path?.[0]) {
				walk(member, path, callback);
			}
		});
	}

	if (ast.type === 'Array') {
		ast.elements.forEach((element, index) => {
			if (index === path?.[0]) {
				walk(element, path, callback);
			}
		});
	}

	if (ast.type === 'Member') {
		if (ast.name.value === path?.[0]) {
			if (ast.value.type === 'Array') {
				let index = path.at(1);
				// if (typeof index !== 'number') {
				// 	index = path.at(-2);
				// 	// path.splice(0, 1);
				// } else {
				// }
				// if (typeof index !== 'number') {
				// 	index = path.at(-2);
				// if (typeof index !== 'undefined') {
				// 	callback(ast.value.loc);
				// 	return
				// }

				if (typeof index !== 'number') {
					// FIXME: (for fixed array list transformed to object)
					// index = Number.parseInt(index ??'', 10);
					// if (!Number.isNaN(index)) {

					// }

					if (typeof index !== 'number') {
						// path.splice(1);
						callback(ast.value.loc);
						return;
					}
				}

				const arrayElement = ast.value.elements?.[index];

				if (!arrayElement) {
					return;
				}

				walk(arrayElement, path.splice(1), callback);
			} else if (path.length === 1) {
				callback(ast.value.loc);
			} else {
				walk(ast.value, path.splice(1), callback);
			}
		}
	}

	if (ast.type === 'Element') {
		if (path.length === 1) {
			callback(ast.value.loc);
		} else {
			walk(ast.value, path.splice(1), callback);
		}
	}
}

export function findJsonPathLocation(object: unknown, path: Path) {
	const serialized = JSON.stringify(object, null, 2);
	const ast = parse(serialized);

	let location: Location | undefined;

	const p = [...path];
	walk(ast, p, (foundLocation) => {
		location = foundLocation;
	});

	return location;
}
