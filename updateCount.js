const updateCount = (object, identifier, name, incrementWith, startWith) => {
	incrementWith = incrementWith ?? 1
	startWith = startWith ?? 1

	if (object[identifier][name]) {
		object[identifier][name] += incrementWith
	} else {
		object[identifier][name] = startWith
	}
}

module.exports = updateCount
