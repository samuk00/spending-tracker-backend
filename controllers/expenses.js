const expensesRouter = require('express').Router()
const Expense = require('../models/Expense')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


expensesRouter.get('/', async (request, response, next) => {
    try {
        const expenses = await Expense.find({})
        response.json(expenses)
    } catch (exception) {
        next(exception)
    }
})

expensesRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const expenses = await Expense.find({ user: id })
        response.json(expenses)
    } catch(expection){
        next(expection)
    }
    
})

expensesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const date = new Date()
    const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        const user = await User.findById(decodedToken.id)

        const expense = new Expense({
            price: body.price,
            category: body.category,
            description: body.description,
            date: dateString,
            user: user.id
        })

        const savedExpense = await expense.save()
        user.expenses = user.expenses.concat(savedExpense)
        await user.save()
        response.status(201).json(savedExpense)
    } catch (exception) {
        next(exception)
    }
})

expensesRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    console.log(id)
    try {
        await Expense.findByIdAndRemove(id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})


module.exports = expensesRouter


