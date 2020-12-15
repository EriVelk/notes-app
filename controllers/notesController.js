const noteController = {};
const Note = require('../models/noteModel');
const { body, validationResult } = require('express-validator');

noteController.renderNoteForm = (req, res) => {
    res.render('notes/note', {
        title: 'Create Note'
    });
};

noteController.createNote = [
    //Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape().withMessage('Title must not be empty.'),
    body('description', 'Description not be empty.').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    async(req, res, next) => {

        //Extract the validation errors form a request.
        const errors = validationResult(req);

        //Create a Note object with escaped and trimmed data.
        var note = new Note({
            title: req.body.title,
            description: req.body.description
        });

        if (!errors.isEmpty()) {

            res.render('notes/note', {
                title: 'Create Note',
                note,
                errors: errors.array()
            });
        } else {
            await note.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/notes');
            });
            note.user = req.user.id;
        }
    }
];

//Get All Notes.
noteController.renderAllNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('notes/allnotes', {
        titl: 'Notes',
        notes
    });
}

//Get Edit Notes
noteController.renderEditNote = async(req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note);
    res.render('notes/note', {
        title: 'Edit Note',
        note
    });
}

noteController.editNote = [
    //Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape().withMessage('Title must not be empty.'),
    body('description', 'Description not be empty.').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    async(req, res, next) => {

        //Extract the validation errors form a request.
        const errors = validationResult(req);

        //Create a Note object with escaped and trimmed data.
        var note = new Note({
            title: req.body.title,
            description: req.body.description,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {

            res.render('notes/note', {
                title: 'Edit Note',
                note,
                errors: errors.array()
            });
        } else {
            await Note.findByIdAndUpdate(req.params.id, note, {}, function(err) {
                if (err) {
                    return next(err);
                }
                //Succesfull - redirect all notes.
                res.redirect('/notes');
            })
        }
    }
];

//Post Delete Note
noteController.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
}



module.exports = noteController;