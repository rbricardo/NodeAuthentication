const express = require('express'),
    userMiddleware = require('../middlewares/userMiddleware'),
    router = express.Router();

const Vehicle = require('../models/vehicleModel');

router.use(userMiddleware);

router.get('/list', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('user');

        return res.send({ vehicles });

    } catch (error) {
        console.log(error)

        return res.status(400).send({error: 'error to list vehicle'});
    }
});

router.get('/list/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('user');

        return res.send({ vehicle });

    } catch (error) {
        console.log(error)
        return res.status(400).send({error: 'error to list vehicle'});
    }
});


router.put('/edit/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id).populate('user');
        
        return res.send({ vehicle });

    } catch (error) {
        return res.status(400).send({error: 'error to edit vehicle'});
    }
});

router.post('/add', async (req, res) => {
    try {
        const vehicle = await Vehicle.create({ ...req.body, user: req.userId })
        res.send('Veículo cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).send({error: 'error to add vehicle'});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndRemove(req.params.id).populate('user');

        return res.send('Veículo deletado com sucesso');
    } catch (error) {
        return res.status(400).send({error: 'error to delete vehicle'});
    }
});

module.exports = app => app.use('/vehicles', router);