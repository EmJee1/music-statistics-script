const bulkParseMetadata = require('./bulkParseMetadata.js')
const updateCount = require('./updateCount.js')
const scan = require('./scan.js')
const fs = require('fs')

const CONFIG = JSON.parse(fs.readFileSync('./config.json'))

const audioFiles = scan(CONFIG.scanDirectory)

const outputMetadata = async files => {
	const parsedTracks = await bulkParseMetadata(files)
	console.log(parsedTracks[0])

	let statistics = { filetypes: {}, genres: {}, years: {} }
	parsedTracks.forEach(track => {
		const { fileType, genre, year } = track

		if (CONFIG.filetypes.countItemsPerFiletype && fileType)
			updateCount(statistics, 'filetypes', fileType)

		if (CONFIG.genres.countItemsPerGenre && genre)
			genre.forEach(genre => {
				if (!genre.includes(CONFIG.genres.splitCharacter))
					return updateCount(statistics, 'genres', genre)

				genre
					.split(CONFIG.genres.splitCharacter)
					.forEach(genre => updateCount(statistics, 'genres', genre))
			})

		if (CONFIG.years.countItemsPerYear && year)
			updateCount(statistics, 'years', year)
	})

	return statistics
}

outputMetadata(audioFiles).then(console.log).catch(console.error)
