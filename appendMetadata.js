const path = require('path')

const appendMetadata = async (array, common, file) => {
	const metadata = {
		track: common.track,
		disk: common.disk,
		albumartist: common.albumartist,
		composer: common.composer,
		title: common.title,
		album: common.album,
		genre: common.genre,
		year: common.year,
		artists: common.artists,
		artist: common.artist,
		fileType: path.extname(file),
		filePath: file,
	}

	array.push(metadata)
}

module.exports = appendMetadata
