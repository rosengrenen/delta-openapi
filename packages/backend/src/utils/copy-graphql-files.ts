import fs from 'fs';
import glob from 'glob';

glob('src/modules/**/*.gql', async (error, files) => {
	if (error) {
		console.log(error);
		return;
	}

	const BASE_PATH = __dirname.replace(/src\/utils$/, '');
	for (const file of files) {
		const localFilePath = file.replace(/^src/, '');

		const from = BASE_PATH + file;
		const to = BASE_PATH + 'dist' + localFilePath;

		const folder = to.split('/').slice(0, -1).join('/');

		new Promise((resolve, reject) => {
			fs.access(folder, err => {
				if (err) {
					fs.mkdir(folder, { recursive: true }, err => {
						if (err) {
							reject(err);
						}

						resolve(undefined);
					});
				} else {
					resolve(undefined);
				}
			});
		})
			.then(() => {
				return new Promise(resolve => {
					fs.copyFile(from, to, () => {
						console.log('Copied', from, 'to', to);
						resolve(undefined);
					});
				});
			})
			.catch(error => console.log(error));
	}
});
