const bulkParseMetadata = require('./bulkParseMetadata.js')
const scan = require('./scan.js')
const fs = require('fs')

const CONFIG = JSON.parse(fs.readFileSync('./config.json'))

const audioFiles = scan(CONFIG.scanDirectory)

const outputMetadata = async files => {
	const parsedTracks = await bulkParseMetadata(files)

	let statistics = { filetypes: {}, genres: {} }
	parsedTracks.forEach(track => {
		const { fileType, genre } = track

		if (CONFIG.filetypes.countItemsPerFiletype && fileType) {
			const statFiletype = statistics.filetypes[fileType]
			statistics.filetypes[fileType] = statFiletype ? statFiletype + 1 : 1
		}

		if (CONFIG.genres.countItemsPerGenre && genre)
			genre.forEach(genre => {
				const updateGenreCount = genre => {
					const statGenre = statistics.genres[genre]
					return (statistics.genres[genre] = statGenre ? statGenre + 1 : 1)
				}

				if (!genre.includes(CONFIG.genres.splitCharacter))
					return updateGenreCount(genre)

				genre.split(CONFIG.genres.splitCharacter).forEach(updateGenreCount)
			})
	})

	return statistics
}

outputMetadata(audioFiles).then(console.log).catch(console.error)
