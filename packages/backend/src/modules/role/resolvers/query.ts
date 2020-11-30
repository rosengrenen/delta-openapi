import { RoleModule } from '../__generated__/module-types';

const resolvers: RoleModule.Resolvers = {
	Query: {
		roles: () => {
			const roles = [
				{
					id: '1',
				},
				{
					id: '2',
				},
			];

			return roles;
		},
	},
};

export default resolvers;
