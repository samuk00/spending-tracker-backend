const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (expection) {
        next(expection)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id
    console.log(id)
    try {
        const user = await User.findById(id)
        response.json(user)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.password || body.password.length < 6) {
        response.status(400).json({
            error: 'Password must be at least 6 characters'
        })
    } else {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            budget: 0
        })
        try {
            const savedUser = await user.save()
            response.status(201).json(savedUser.toJSON())
        } catch (expection) {
            next(expection)
        }
    }

})

usersRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const newBudget = request.body.budget
    try {
        const user = await User.findByIdAndUpdate(id, { budget: newBudget })
        response.status(201).json({ budget: user.budget })
    } catch (exception) {
        next(exception)
    }

})

module.exports = usersRouter