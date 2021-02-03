const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    category: String,
    description:  String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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