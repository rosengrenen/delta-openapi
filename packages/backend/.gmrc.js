require('dotenv').config();

const PG_HOST = String(process.env.PG_HOST);
const PG_ROOT_PASSWORD = String(process.env.PG_ROOT_PASSWORD);
const PG_DELTA_PASSWORD = String(process.env.PG_DELTA_PASSWORD);

module.exports = {
	connectionString: `postgres://delta:${PG_DELTA_PASSWORD}@${PG_HOST}:5432/delta`,
	shadowConnectionString: `postgres://delta:${PG_DELTA_PASSWORD}@${PG_HOST}:5432/delta_shadow`,
	rootConnectionString: `postgres://postgres:${PG_ROOT_PASSWORD}@${PG_HOST}:5432/postgres`,
	'//generatedWith': '1.0.2',
};
