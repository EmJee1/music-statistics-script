const updateCount = (object, identifier, name, incrementWith, startWith) => {
	incrementWith = incrementWith ?? 1
	startWith = startWith ?? 1

	if (object[identifier][name]) {
		object[identifier][name] += incrementWith
	} else {
		object[identifier][name] = startWith
	}
}

const updateSplittedCount = (
	object,
	identifier,
	unsplittedName,
	splitCharacter
) => {
	unsplittedName.forEach(artist => {
		if (!artist.includes(splitCharacter))
			updateCount(object, identifier, artist)
		else
			artist
				.split(splitCharacter)
				.forEach(artist => updateCount(object, identifier, artist))
	})
}

module.exports = { updateCount, updateSplittedCount }
