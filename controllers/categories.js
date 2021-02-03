const categoriesRouter = require('express').Router()
const Category = require('../models/Category')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

categoriesRouter.get('/', async (request, response, next) => {
    try {
        const categories = await Category.find({})
        response.json(categories)
    } catch (exception) {
        next(exception)
    }
})

categoriesRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const categories = await Category.find({ user: id })
        response.json(categories)
    }
    catch (exception) {
        next(exception)
    }
})

categoriesRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        const user = await User.findById(decodedToken.id)
        console.log(user)

        const category = new Category({
            category: body.category,
            user: user.id
        })

        const savedCategory = await category.save()
        user.categories = user.categories.concat(savedCategory)
        await user.save()
        response.status(201).json(savedCategory)
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = categoriesRouter
