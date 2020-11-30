import { fromGlobalId } from '../../../utils/global-id';
import { RelayModule } from '../__generated__/module-types';

const resolvers: RelayModule.Resolvers = {
	Query: {
		node: (_parent, { id: globalId }) => {
			const { id, type } = fromGlobalId(globalId);

			// Generated types wants us to return a complete object but this
			// resolver should not be aware of all types that implements Node
			// so we delegate that responsibilty to the field resolvers of
			// each type
			return {
				__typename: type,
				id: id,
			} as any;
		},
	},
};

export default resolvers;
