const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
	return 'Notes'
}

const loadNotes = () => {

	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	
	} catch (e) {
		return []

	}
}

const saveNotes = function (notes) {

	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)

}

const addNote = (title, body) => {

	const notes = loadNotes()
	// const duplicateNotes = notes.filter((note) => note.title == title)
	const duplicateNote = notes.find((note) => note.title == title)

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log('Note added')

	} else {
		console.log('Duplicated note')
	}
}

const removeNote = (title) => {

	console.log(title)

	const notes = loadNotes()
	const notesToKeep = notes.filter((note) => note.title != title)

	if (notes.length != notesToKeep.length) {
		saveNotes(notesToKeep)
		console.log('Note removed')
	} else {
		console.log('Note not removed')
	}
}

const listNotes = () => {
	const notes = loadNotes()

	console.log(chalk.inverse('Your notes'))

	notes.forEach((note) => {
		console.log(note.title)
	})
}

const readNote = (title) => {

	const notes = loadNotes()
	const note = notes.find((note) => note.title == title)

	if (note) {
		console.log(chalk.inverse(note.title))
		console.log(note.body)
	} else {
		console.log(chalk.red.inverse('Note not found'))
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}