import { toGlobalId } from '../../../utils/global-id';
import { ModuleResolversType } from '../../../utils/graphql-modules';

const resolvers: ModuleResolversType = {
	Role: {
		id: ({ id }) => toGlobalId('Role', id),
		email_prefix: ({ id }) => 'generic email prefix' + id,
		name_en: ({ id }) => 'generic name' + id,
		name_sv: ({ id }) => 'generic name' + id,
	},
};

export default resolvers;
