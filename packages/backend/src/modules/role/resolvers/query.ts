import { ModuleResolversType } from '../../../utils/graphql-modules';

const resolvers: ModuleResolversType = {
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
