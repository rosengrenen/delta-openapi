// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('../../.eslintrc.base');

module.exports = {
	...baseConfig,
	rules: {
		...baseConfig.rules,
		'@typescript-eslint/naming-convention': 'off',
	},
};
