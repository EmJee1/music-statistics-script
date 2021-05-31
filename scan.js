const path = require('path')
const fs = require('fs')

const CONFIG = JSON.parse(fs.readFileSync('./config.json'))

const scanAllAudioFiles = rootDir => {
	const filesToRename = []

	const scanFileDir = dir => {
		if (!dir) return console.error('The path is empty or does not exist:', dir)

		fs.readdirSync(dir).forEach(file => {
			if (!fs.lstatSync(path.join(dir, file)).isDirectory()) {
				if (!CONFIG.filetypes.allowedFiletypes.includes(path.extname(file)))
					return console.error(
						'We skipped files that were not',
						CONFIG.filetypes.allowedFiletypes.join(', '),
						'=>',
						file
					)
				filesToRename.push(path.join(dir, file))
			} else scanFileDir(path.join(dir, file))
		})
	}

	scanFileDir(rootDir)

	return filesToRename
}

module.exports = scanAllAudioFiles
