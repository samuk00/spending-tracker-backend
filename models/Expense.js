const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    category: String,
    description:  String,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }
})

expenseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Expense', expenseSchema)