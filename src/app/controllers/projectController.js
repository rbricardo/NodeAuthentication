const express = require('express'),
    userMiddleware = require('../middlewares/userMiddleware'),
    router = express.Router();

router.use(userMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true });
});

module.exports = app => app.use('/projects', router);