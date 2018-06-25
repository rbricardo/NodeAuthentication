const express = require('express'),
    jwt = require('jsonwebtoken'),
    authConfig = require('../../config/auth.json'),
    crypto = require('crypto');
router = express.Router();

const User = require('../models/userModel');
const mailer = require('../../modules/mailer');

generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 3600,
    });
}

// LIST
router.get('/userslist', (req, res) => {
    User.find({}, (err, users) => {
        var userMap = {};

        users.forEach(user => {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

// SIGN UP
router.post('/signup', (req, res) => {

    res.status(200);
    const user = new User(req.body);

    user.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({
            user,
            token: generateToken({ id: user.id })
        });
    });



})

// SIGN IN
router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });

    if (user.password !== password)
        return res.status(400).send({ error: 'Senha inválida' })

    res.send({ user, token: generateToken({ id: user.id }) })
});

// EDIT USER
router.put('/edit/:id', (req, res) => {

    console.log(req.body)

    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },

        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )

})

// DELETE USER
router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)

    User.findByIdAndRemove(req.params.id, (err, user) => {

        if (err) return res.status(500).send(err);
        const response = {
            message: "Usuário deletado com sucesso!",
            id: user.id
        };

        return res.status(200).send(response);

    })
});

// FORGOT PASSWORD
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'Usuário não encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user._id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'rb.ricardo01@aaa.com',
            template: 'auth/forgot_password',
            context: { token }
        }, err => {
            if (err)
                return res.status(400).send(err)

            return res.send('foi');
        })

    } catch (err) {
        res.status(400).send({ error: err })
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token Invalid' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        res.send('show');

    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = app => app.use('/auth', router);