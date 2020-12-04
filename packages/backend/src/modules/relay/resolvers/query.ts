import { fromGlobalId } from '../../../utils/global-id';
import { ModuleResolversType } from '../../../utils/graphql-modules';

const resolvers: ModuleResolversType = {
	Query: {
		node: (_parent, { id: globalId }) => {
			const { id, type } = fromGlobalId(globalId);

			return {
				__typename: type,
				id: id,
			};
		},
	},
};

export default resolvers;
