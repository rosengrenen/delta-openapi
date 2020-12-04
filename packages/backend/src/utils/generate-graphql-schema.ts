import fs from 'fs';
import { printSchema } from 'graphql/utilities';
import path from 'path';

import { application } from '../modules/application';

const GENERATED_FOLDER = path.join(__dirname, '../__generated__');
const GENERATED_FILE = 'schema.gql';

(function () {
	try {
		const schemaString = printSchema(application.schema);

		if (!fs.existsSync(GENERATED_FOLDER)) {
			fs.mkdirSync(GENERATED_FOLDER);
		}

		fs.writeFileSync(path.join(GENERATED_FOLDER, GENERATED_FILE), schemaString);
	} catch (error) {
		console.error(error);
	}
})();
