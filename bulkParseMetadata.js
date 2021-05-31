const appendMetadata = require('./appendMetadata.js')
const parseFile = require('./parseFile.js')

const bulkParseMetadata = async files => {
	const out = []
	for (const file of files) {
		const parsedFile = await parseFile(file)
		if (!parseFile) return

		appendMetadata(out, parsedFile, file)
	}
	return out
}

module.exports = bulkParseMetadata
