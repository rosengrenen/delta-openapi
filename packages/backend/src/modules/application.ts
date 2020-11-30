import { createApplication } from 'graphql-modules';

import { relayModule } from './relay';
import { roleModule } from './role';
import { rootModule } from './root';

export const application = createApplication({
	modules: [rootModule, relayModule, roleModule],
});
