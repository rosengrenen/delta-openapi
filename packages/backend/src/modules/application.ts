import { createApplication } from 'graphql-modules';

import { testModule } from './test';

export const application = createApplication({
	modules: [testModule],
});
