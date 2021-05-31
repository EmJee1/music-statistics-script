const mm = require('music-metadata')
const path = require('path')

const parseFile = async file => {
	try {
		const common = (await mm.parseFile(file)).common
		return common
	} catch (err) {
		console.error('Error with file', path.basename)
		return null
	}
}

module.exports = parseFile
