import { toGlobalId } from '../../../utils/global-id';
import { RoleModule } from '../__generated__/module-types';

const resolvers: RoleModule.Resolvers = {
	Role: {
		id: ({ id }) => toGlobalId('Role', id),
		email_prefix: ({ id }) => 'generic email prefix' + id,
		name: ({ id }) => 'generic name' + id,
	},
};

export default resolvers;
