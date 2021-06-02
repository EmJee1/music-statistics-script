const bulkParseMetadata = require('./bulkParseMetadata.js')
const { updateCount, updateSplittedCount } = require('./updateCount.js')
const scan = require('./scan.js')
const fs = require('fs')

const CONFIG = JSON.parse(fs.readFileSync('./config.json'))

const audioFiles = scan(CONFIG.scanDirectory)

const outputMetadata = async files => {
	const parsedTracks = await bulkParseMetadata(files)

	let statistics = {
		filetypes: {},
		genres: {},
		years: {},
		albums: {},
		artists: {},
	}
	parsedTracks.forEach(track => {
		const { fileType, genre, year, album, artists } = track

		if (CONFIG.filetypes.countItemsPerFiletype && fileType)
			updateCount(statistics, 'filetypes', fileType)

		if (CONFIG.genres.countItemsPerGenre && genre)
			updateSplittedCount(
				statistics,
				'genres',
				genre,
				CONFIG.genres.splitCharacter
			)

		if (CONFIG.years.countItemsPerYear && year)
			updateCount(statistics, 'years', year)

		if (CONFIG.albums.countAlbums && album)
			updateCount(statistics, 'albums', album)

		if (CONFIG.artists.countArtists && artists)
			updateSplittedCount(
				statistics,
				'artists',
				artists,
				CONFIG.artists.splitCharacter
			)
	})

	return statistics
}

outputMetadata(audioFiles).then(console.log).catch(console.error)
