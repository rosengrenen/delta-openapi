import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadTypedefsSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

export function loadTypeDefsFromSchemaFolder(moduleDir: string) {
	return loadTypedefsSync(path.join(moduleDir, 'schema', '*.{gql,ts,js}'), {
		loaders: [new GraphQLFileLoader(), new CodeFileLoader()],
	}).map(source => {
		if (!source.document) {
			throw new Error('Invalid GQL document in: ' + source.location);
		}

		return source.document;
	});
}

export function loadResolversFromResolversFolder(moduleDir: string) {
	return loadFilesSync(path.join(moduleDir, 'resolvers', '*.{gql,ts,js}'));
}
