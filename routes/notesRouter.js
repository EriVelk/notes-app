const express = require('express');
const router = express.Router();

const { renderAllNotes, renderNoteForm, createNote, renderEditNote, editNote, deleteNote } = require('../controllers/notesController');

const { isAuthenticated } = require('../helpers/auth');

//Get form create note
router.get('/notes/note', isAuthenticated, renderNoteForm);

router.post('/notes/note', isAuthenticated, createNote);

//Get all notes.
router.get('/notes', isAuthenticated, renderAllNotes);

//Get Edit Note.
router.get('/notes/edit/:id', isAuthenticated, renderEditNote);

router.post('/notes/edit/:id', isAuthenticated, editNote);

//Delete Note.
router.post('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;