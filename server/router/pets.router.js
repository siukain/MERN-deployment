const express = require('express');
const router = express.Router()
const {petsController} = require('../controllers/pets.controller');

router.get('/', async (req, res) => {
    const response = await petsController.getAll();
    res.send(response);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await petsController.getById(id, res);
    res.send(response);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await petsController.deleteById(id, res);
    res.send(response);
});

router.post('/', async (req, res) => {
    const response = await petsController.create(req.body, res);
    res.send(response);
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await petsController.update(req.body, id, res);
    res.send(response);
});

router.patch('/likes/:id', async (req, res) => {
    const id = req.params.id;
    const response = await petsController.updateLikes(id, res);
    res.send(response);
});

module.exports.petsRouter = router
