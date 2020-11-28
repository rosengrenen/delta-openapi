import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { application } from './modules/application';

const app = express();

const apolloServer = new ApolloServer({
	schema: application.createSchemaForApollo(),
});

apolloServer.applyMiddleware({ app });

app.listen(3000, () => console.log('Server running'));
