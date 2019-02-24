// --- Imports
const express = require('express');
const router = express.Router();
const Task = require('../models/task');


// --- Render of index
router.get('/', async (req, res) => {

   const tasks = await Task.find();
    res.render('index', {
        title : "CRUD Nodejs",
        tasks
    });
});

// --- Add task of user
router.post('/add', async (req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.redirect('/');

});

// --- Done task of user
router.get('/done/:id', async (req, res) => {

    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');


});

// --- Edit task of user
router.get('/edit/:id', async (req, res) =>{

    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        title : "Edit user",
        task
    });
});


// --- Post of task edit
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
})


// --- Delete task of user
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({_id : id});
    res.redirect('/');
});

module.exports = router;