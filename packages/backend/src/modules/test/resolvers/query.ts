import { TestModule } from '../__generated__/module-types';

const resolvers: TestModule.Resolvers = {
	Query: {
		test: () => {
			return {
				id: '123',
			};
		},
	},
};

export default resolvers;
