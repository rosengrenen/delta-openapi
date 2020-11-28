import { createModule } from 'graphql-modules';

import { loadResolversFromResolversFolder, loadTypeDefsFromSchemaFolder } from '../utils/graphql-modules';

export const testModule = createModule({
	id: 'test-module',
	dirname: __dirname,
	typeDefs: loadTypeDefsFromSchemaFolder(__dirname),
	resolvers: loadResolversFromResolversFolder(__dirname),
});
